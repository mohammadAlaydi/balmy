import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ success: false, message: "Address ID is required" }, { status: 400 });
    }

    const accessToken = cookies().get("accessToken")?.value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/customer/addresses/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    });

    const rawData = await response.json().catch(() => ({}));
    return NextResponse.json(
      {
        success: response.ok,
        message: rawData?.message || (response.ok ? "Address deleted successfully" : "Failed to delete address"),
        data: rawData,
      },
      { status: response.status }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message || "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ success: false, message: "Address ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const accessToken = cookies().get("accessToken")?.value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/customer/addresses/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify(body),
    });

    const rawData = await response.json().catch(() => ({}));
    return NextResponse.json(
      {
        success: response.ok,
        message: rawData?.message || (response.ok ? "Address updated successfully" : "Failed to update address"),
        data: rawData,
      },
      { status: response.status }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message || "Server error" }, { status: 500 });
  }
}
