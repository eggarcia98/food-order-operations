import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";
import { jsonError } from "@/lib/api/http";
export const runtime = "edge";

export async function GET(request: Request) {
    try {
        requireAuth(request);
        const customers = await prisma.customer.findMany({
            orderBy: {
                first_name: "asc",
            },
        });

        return NextResponse.json(customers);
    } catch (error) {
        return jsonError(error, "Failed to fetch customers");
    }
}
