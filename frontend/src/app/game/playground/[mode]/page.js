"use client";

import { useParams } from "next/navigation"

export default function Page() {
const params = useParams();

    return <div className="text-tx06">
{params.mode}
    </div>
}