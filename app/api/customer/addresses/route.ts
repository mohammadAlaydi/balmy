import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// ✅ Create new address
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const accessToken = cookies().get("accessToken")?.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/customer/addresses`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body: JSON.stringify(body),
      }
    );

    const rawData = await response.json().catch(() => ({}));

    return NextResponse.json(
      {
        success: response.ok,
        message:
          rawData?.message ||
          (response.ok
            ? "Address added successfully"
            : "Failed to add address"),
        data: rawData,
      },
      { status: response.status }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
