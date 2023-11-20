import Link from "next/link";

import { cn, formatDate } from "@/libs/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { PostOperations } from "@/components/post-operations";
import { CategoryOperations } from "./category-operations";
import { UserAvatar } from "./user-avatar";

interface PostItemProps {
  post: any;
  mode?: "category" | "post";
}

export function PostItem({ post, mode }: PostItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={
            mode === "category" ? `/dashboard/categories` : `/editor/${post.id}`
          }
          className={`font-semibold cursor-default ${
            mode !== "category" && "hover:underline cursor-pointer"
          } `}
        >
          <div
            className={cn("flex items-center", mode !== "category" && "gap-3")}
          >
            <div className="select-none">
              {mode !== "category" && (
                <div>
                  <UserAvatar
                    user={{
                      name: post.author?.username || null,
                      image: post.author?.image || null,
                    }}
                    className="h-5 w-5"
                  />
                </div>
              )}
            </div>
            {post.title}
          </div>
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(post.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      {mode === "category" ? (
        <CategoryOperations category={{ id: post.id, title: post.title }} />
      ) : (
        <PostOperations post={{ id: post.id, title: post.title }} />
      )}
    </div>
  );
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
