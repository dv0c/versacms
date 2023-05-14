import { ApiKeys } from "@/app/(Dashboard)/dashboard/api/columns"

export async function getApiKeysData(): Promise<ApiKeys[]> {
    // Fetch data from your API here.
    return [
        {
            id: "cb962402c242d72440d6607c440d77ff",
            requests: 1204,
            status: "Disabled",
            model: "Posts",
        },
        {
            id: "ca969b97f46607c440d79c9ad1b447ff",
            requests: 532,
            status: "Expired",
            model: "Categories",
        },
        // ...
    ]
}