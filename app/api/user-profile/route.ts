import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {

    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const payload = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/customer/profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body: JSON.stringify(payload),
      }
    );

    const rawData = await response.json().catch(() => ({}));

    return NextResponse.json(
      {
        success: response.ok,
        statusCode: response.status,
        message: rawData?.message || "Profile updated successfully",
        data: rawData,
      },
      { status: response.status }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Profile update failed" },
      { status: 500 }
    );
    
  }
}
