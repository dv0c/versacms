/* eslint-disable react/no-unescaped-entities */
"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Post } from "@prisma/client"

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


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Button } from "./ui/button"

async function deleteCategory(categoryId: string) {
  const response = await fetch(`/api/categories/${categoryId}`, {
    method: "DELETE",
  })

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "Your post was not deleted. Please try again.",
      variant: "destructive",
    })
  }

  return true
}

interface CategoryOperationsProps {
  category: Pick<Post, "id" | "title">
}

export function CategoryOperations({ category }: CategoryOperationsProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [showEditDialog, setShowEditDialog] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
  const [inputValue, setInputValue] = React.useState<any>(category.title || "")
  const [isSaving, setIsSaving] = React.useState<boolean>(false)


  async function saveChanges(categoryId: string, title: string) {
    setIsSaving(true)

    const response = await fetch(`/api/categories/${categoryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
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

    setIsSaving(false)
    setShowEditDialog(false)

    return toast({
      description: "Your category has been saved.",
    })
  }


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <span onClick={() => setShowEditDialog(true)} className="flex w-full">
              Edit
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this category?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteCategory(category.id)

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router.refresh()
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category Name</DialogTitle>
            <DialogDescription>
              Make changes to category. Click save when you're done.
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
            <Button onClick={(e) => {
              e.preventDefault()
              saveChanges(category.id, inputValue)
            }} >
              {
                isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              }
              Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
