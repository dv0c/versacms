/* eslint-disable react/no-unescaped-entities */
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/libs/utils"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface PostCreateButtonProps extends ButtonProps {
  mode?: String | "create"
}

export function   PostCreateButton({
  className,
  variant,
  name,
  mode,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showEditDialog, setShowEditDialog] = React.useState<boolean>(false)
  const [inputValue, setInputValue] = React.useState<any>("")

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: "Limit of 3 posts reached.",
          description: "Please upgrade to the PRO plan.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      })
    }

    const post = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/editor/${post.id}`)
  }

  async function createCategory() {
    setIsLoading(true)

    const response = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({
        title: inputValue,
      }),
    })


    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your category was not saved. Please try again.",
        variant: "destructive",
      })
    }


    router.refresh()

    setIsLoading(false)
    setShowEditDialog(false)

    return toast({
      description: "Your category has been saved.",
    })
  }

  return (
    <>
      <button
        onClick={mode === "category" ? () => setShowEditDialog(true) : onClick}
        className={cn(
          buttonVariants({ variant }),
          {
            "cursor-not-allowed opacity-60": isLoading,
          },
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.add className="mr-2 h-4 w-4" />
        )}
        {name || "Create Post"}
      </button>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>
              Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <h1>
                Category Name
              </h1>
              <Input onChange={(e) => { setInputValue(e.target.value) }} id="name" value={inputValue} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={(e) => createCategory()} >
              {
                isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              }
              Create Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
