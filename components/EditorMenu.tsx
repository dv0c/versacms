import { Menu, MoreVertical } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import ImageUpload from "./image-upload"

import AddCategory from "./ui/add-category"

export default function EditorMenu() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button type="button" variant={'ghost'}>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent position={'right'} size={'xsm'}>
                <SheetHeader>
                    <SheetTitle>Edit Your Post</SheetTitle>
                    <SheetDescription>
                        Add more attributes to your post here.<br /><br /> There is not auto save feature so do not forget to save
                        your progress before you close the page!
                    </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                    <ImageUpload />
                </div>
                <div className="mt-3">
                    <AddCategory id={''} />
                </div>
            </SheetContent>
        </Sheet>
    )
}
