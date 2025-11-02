import { NextRequest, NextResponse } from "next/server";
import { makeAuthenticatedRequest } from "@/lib/auth-middleware";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const response = await makeAuthenticatedRequest(
      `${API_URL}/v1/customer/cart/add/${productId}`,
      {
        method: "POST",
        body: JSON.stringify({ quantity }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to add to cart" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
