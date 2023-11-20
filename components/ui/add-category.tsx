"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./label";
import { useFetch } from "usehooks-ts";
import { Category, Post } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";

export default function AddCategory({
  post,
}: {
  post: Post & {
    Category: Category;
  };
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const { data, error } = useFetch<any[]>(
    process.env.NEXT_PUBLIC_APP_URL + "/api/categories"
  );

  const save = async (e: any) => {
    setLoading(true);

    await axios
      .patch("/api/posts/" + post.id, {
        CategoryId: e,
      })

      .finally(() => {
        setLoading(false);
        router.refresh();
        return toast({
          title: "Congratulations 🎉",
          description: "Category has been updated.",
          variant: "default",
        });
      });
  };

  return (
    <div className="flex flex-col gap-3">
      <Label>Category</Label>
      {!isLoading ? (
        <Select
          disabled={isLoading}
          value={post.Category.id}
          onValueChange={(e) => save(e)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {data?.map((i: any) => (
              <SelectItem className="cursor-pointer" key={i?.id} value={i?.id}>
                {i?.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className="flex h-10 items-center justify-center rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[180px]">
          <Loader className="animate-spin" />
        </div>
      )}
    </div>
  );
}
