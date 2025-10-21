import { prisma } from "@/prisma";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import getBanksAccounts from "@/lib/api/plaid/getBanksAccounts";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!!data.userId) {
      return NextResponse.json(
        { error: "User id is required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { id: data.userId },
      include: { banks: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Couldn't find user." },
        { status: 404 }
      );
    }

    if (!user.banks.length) {
      return NextResponse.json(
        { error: "User has no accounts." },
        { status: 404 }
      );
    }

    const { successful, failed } = await getBanksAccounts(user.banks);

    return NextResponse.json({
      success: failed.length === 0,
      successfulCount: successful.length,
      failedCount: failed.length,
      failed,
      accounts: successful,
    });
  } catch (err) {
    if (isAxiosError(err)) {
      return NextResponse.json(
        { error: err.message },
        { status: err.response?.status }
      );
    }

    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
