import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api-service';

interface BreadcrumbData {
  [key: string]: string;
}

export const useBreadcrumbData = (segments: string[]) => {
  const [breadcrumbData, setBreadcrumbData] = useState<BreadcrumbData>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data: BreadcrumbData = {};

      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const decodedSegment = decodeURIComponent(segment);
        const isNumericId = /^\d+$/.test(decodedSegment);

        if (isNumericId) {
          // Check if this is a product or category ID
          const prevSegment = i > 0 ? segments[i - 1] : '';
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
                const categorySlug = segments[categorySlugIndex];
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
      setLoading(false);
    };

    if (segments.length > 0) {
      fetchData();
    } else {
      setBreadcrumbData({});
      setLoading(false);
    }
  }, [segments]);

  return { breadcrumbData, loading };
};
