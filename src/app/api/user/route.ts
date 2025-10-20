import { prisma } from "@/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.userId) {
      return NextResponse.json(
        {
          error: "User id is required!",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { id: data.userId },
      include: { banks: true, expensesGoals: true },
    });

    return NextResponse.json({
      user,
    });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An error occured while getting user data!" },
      { status: 500 }
    );
  }
}
