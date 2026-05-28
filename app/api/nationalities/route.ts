import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";
export const runtime = "edge";

export async function GET(request: Request) {
    try {
        requireAuth(request);
        const nationality = await prisma.nationality.findMany({
            orderBy: {
                name: "asc",
            },
        });

        return NextResponse.json(nationality);
    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 500 }
        );
    }
}
