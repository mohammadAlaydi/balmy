import { useState, useEffect, useMemo } from 'react';
import { apiService } from '@/lib/api-service';
import { DISABLE_BACKEND_FETCH } from "@/lib/dev-config";

interface BreadcrumbData {
  [key: string]: string;
}

export const useBreadcrumbData = (segments: string[]) => {
  
  const [breadcrumbData, setBreadcrumbData] = useState<BreadcrumbData>({});
  const [loading, setLoading] = useState(false);

  // Memoize segments to prevent infinite loops
  const memoizedSegments = useMemo(() => segments, [segments.join('/')]);

  useEffect(() => {
    const fetchData = async () => {
      // Prevent unnecessary API calls if no segments or already loading
      if (memoizedSegments.length === 0) {
        setBreadcrumbData({});
        return;
      }

      // DEV MODE: Skip API calls when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        console.log("🚧 [DEV] Breadcrumb data fetch bypassed");
        const mockData: BreadcrumbData = {};
        memoizedSegments.forEach((segment, i) => {
          const decodedSegment = decodeURIComponent(segment);
          if (/^\d+$/.test(decodedSegment)) {
            mockData[segment] = `Item ${decodedSegment}`;
          }
        });
        setBreadcrumbData(mockData);
        return;
      }

      setLoading(true);
      const data: BreadcrumbData = {};

      try {
        for (let i = 0; i < memoizedSegments.length; i++) {
          const segment = memoizedSegments[i];
          const decodedSegment = decodeURIComponent(segment);
          const isNumericId = /^\d+$/.test(decodedSegment);

          if (isNumericId) {
            // Check if this is a product or category ID
            const prevSegment = i > 0 ? memoizedSegments[i - 1] : '';
            const decodedPrevSegment = decodeURIComponent(prevSegment);

            try {
              if (decodedPrevSegment === 'product') {
                // Fetch product name
                const productData = await apiService.getProductDetails(parseInt(decodedSegment)) as any;
                if (productData?.data?.name) {
                  data[segment] = productData.data.name;
                } else {
                  data[segment] = decodedSegment;
                }
              } else if (decodedPrevSegment === 'category') {
                // For category IDs, we want to hide them from breadcrumb
                // Check if there's a category slug before the ID
                const categorySlugIndex = i - 1;
                if (categorySlugIndex >= 0) {
                  const categorySlug = memoizedSegments[categorySlugIndex];
                  const decodedCategorySlug = decodeURIComponent(categorySlug);
                  
                  // If we have a category slug (non-numeric), use it instead of the ID
                  if (!/^\d+$/.test(decodedCategorySlug)) {
                    // Hide the ID by not adding it to breadcrumbData
                    // The breadcrumb will use the category slug instead
                    continue;
                  }
                }
                
                // Fallback: if no category slug, keep the ID
                data[segment] = decodedSegment;
              } else {
                // Unknown context, keep the ID
                data[segment] = decodedSegment;
              }
            } catch (error) {
              console.warn(`Failed to fetch data for segment ${segment}:`, error);
              // Fallback to showing the ID
              data[segment] = decodedSegment;
            }
          }
        }

        setBreadcrumbData(data);
      } catch (error) {
        console.error('Error fetching breadcrumb data:', error);
        setBreadcrumbData({});
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [memoizedSegments]);

  return { breadcrumbData, loading };
};
