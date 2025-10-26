import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Address ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/customer/addresses/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      }
    );

    const rawData = await response.json().catch(() => ({}));

    return NextResponse.json(
      {
        success: response.ok,
        statusCode: response.status,
        message:
          rawData?.message ||
          (response.ok
            ? "Address deleted successfully"
            : "Failed to delete address"),
        data: rawData,
      },
      { status: response.status }
    );
  } catch (err: any) {
    console.error("❌ Delete address error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
