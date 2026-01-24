import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const DISABLE_BACKEND_FETCH = process.env.DISABLE_BACKEND_FETCH === "true"; // Assuming this is defined elsewhere
const MOCK_PRODUCT_DETAILS = (id: number) => ({ // Assuming this is defined elsewhere
  id: id,
  name: `Mock Product ${id}`,
  description: `This is a mock description for product ${id}.`,
  price: 100 + id,
  currency: "USD",
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (DISABLE_BACKEND_FETCH) {
    console.log("🚧 Backend fetches are DISABLED - using mock data");
    const mockData = MOCK_PRODUCT_DETAILS(parseInt(id));
    return NextResponse.json(mockData);
  }

  try {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    // Product details endpoint might not require authentication, but we'll include token if available
    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_URL}/v1/product-details/${id}`, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // If unauthorized and refresh token exists, attempt one refresh then retry once
      if (response.status === 401 && refreshToken && accessToken) {
        try {
          const url = new URL(request.url);
          const refreshResp = await fetch(
            `${url.origin}/api/auth/refresh`,
            {
              method: "POST",
            }
          );
          if (refreshResp.ok) {
            const retry = await fetch(
              `${API_URL}/v1/product-details/${id}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${cookieStore.get("accessToken")?.value ?? ""
                    }`,
                  Accept: "application/json",
                },
              }
            );
            const retryData = await retry.json();
            if (retry.ok) {
              return NextResponse.json(retryData);
            }
            return NextResponse.json(
              {
                message: retryData.message || "Failed to fetch product details",
              },
              { status: retry.status }
            );
          }
        } catch { }
      }

      return NextResponse.json(
        { message: data.message || "Failed to fetch product details" },
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
