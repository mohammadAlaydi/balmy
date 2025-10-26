// app/api/checkout/save-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const payload = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/customer/checkout/save-order`,
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

    // Normalize the output so frontend always gets consistent data
    return NextResponse.json(
      {
        success: response.ok,
        statusCode: response.status,
        message: rawData?.message || "Order saved successfully",
        data: rawData,
      },
      { status: response.status }
    );
  } catch (err: any) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Checkout failed" },
      { status: 500 }
    );
  }
}
