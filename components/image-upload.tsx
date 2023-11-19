"use client";
import axios from "axios";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";
import { useState } from "react";
import { Loader } from "lucide-react";
import { cn } from "@/libs/utils";

export default function ImageUpload({ post }: { post: Post }) {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const handleUpload = async (file: any) => {
    if (!file) return;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    }).then(async (res: any) => {
      setLoading(true);
      await axios
        .patch("/api/posts/" + post.id, {
          thumbnail: res,
        })
        .then(() => router.refresh())
        .finally(() => setLoading(false));
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Label>Feature Image</Label>
      <div className="rounded-md w-[250px] relative border aspect-video">
        {!isLoading && !post.thumbnail ? (
          <Label className="flex justify-center items-center h-full absolute w-full">
            Select image
          </Label>
        ) : (
          <img
            className={cn(
              "hover:brightness-50 h-full transition-all brightness-100 absolute w-full rounded-lg",
              isLoading && "brightness-50"
            )}
            // @ts-ignore
            src={post.thumbnail}
            alt="image"
          />
        )}
        {isLoading && <Loader className="animate-spin h-full m-auto" />}
        <input
          onChange={(e: any) => handleUpload(e.target.files[0])}
          type="file"
          className="opacity-0 w-[250px] absolute h-full cursor-pointer"
        />
      </div>
    </div>
  );
}
