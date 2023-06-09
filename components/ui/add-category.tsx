'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "./label"
import { useFetch } from "usehooks-ts"

interface Props {
    id: string
}

export default function AddCategory(props: Props) {

    const save = () => {
        
    }

    const { data, error } = useFetch<any[]>(process.env.NEXT_PUBLIC_APP_URL + '/api/categories')

    return (
        <div className="flex flex-col gap-3">
            <Label>Category</Label>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    {
                        data?.map((i: any) => (
                            <SelectItem className="cursor-pointer" onClick={save} key={i?.id} value={i?.title}>{i?.title}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}
