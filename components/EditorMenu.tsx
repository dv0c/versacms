import { Menu, MoreVertical } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import ImageUpload from "./image-upload";

import AddCategory from "./ui/add-category";
import { Post } from "@prisma/client";

export default function EditorMenu({ post }: { post: Post }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant={"ghost"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent position={"right"} size={"xsm"}>
        <SheetHeader>
          <SheetTitle>Edit Your Post</SheetTitle>
          <SheetDescription>
            Add more attributes to your post here.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <ImageUpload post={post} />
        </div>
        <div className="mt-3">{/* <AddCategory id={""} /> */}</div>
      </SheetContent>
    </Sheet>
  );
}
