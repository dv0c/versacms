import { Label } from "./ui/label"

export default function ImageUpload() {
    return (
        <div className="flex flex-col gap-3">
            <Label>Feature Image</Label>
            <div className="rounded-md w-[250px] relative border aspect-video">
                <Label className="flex justify-center items-center h-full absolute w-full">Select image</Label>
                <input type="file" className="opacity-0 w-[250px] absolute h-full cursor-pointer" />
            </div>
        </div>
    )
}
