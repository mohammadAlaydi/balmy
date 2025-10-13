"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { IoHome } from "react-icons/io5";

import { cn } from "@/lib/utils";
import { useBreadcrumbData } from "@/hooks/use-breadcrumb-data";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ComponentType<{ className?: string }>;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? "span" : "a";

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// Main breadcrumb component with automatic path generation
interface AutoBreadcrumbProps {
  className?: string;
  showHome?: boolean;
}

const AutoBreadcrumb = ({ className, showHome = true }: AutoBreadcrumbProps) => {
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const tBreadcrumb = useTranslations("breadcrumb");
  
  // Get current locale from pathname
  const pathSegments = pathname.split('/').filter(Boolean);
  const locale = pathSegments[0] || 'en';
  const isRTL = locale === 'ar';
  
  // Remove locale from path segments
  const segments = pathSegments.slice(1);
  
  // Fetch dynamic breadcrumb data for numeric IDs
  const { breadcrumbData, loading } = useBreadcrumbData(segments);
  
  // Generate breadcrumb items
  const breadcrumbItems = React.useMemo(() => {
    const items = [];
    let currentPath = `/${locale}`;
    
    // Add home item
    if (showHome) {
      items.push({
        label: t("home"),
        href: `/${locale}/home`,
        isHome: true,
        isLast: false,
      });
    }
    
    // Filter out numeric ID segments first to avoid trailing separators
    const filteredSegments = segments.filter((seg) => !/^\d+$/.test(decodeURIComponent(seg)));

    // Add other segments
    filteredSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === filteredSegments.length - 1;
      
      // Decode URL-encoded segments
      const decodedSegment = decodeURIComponent(segment);
      
      // Check if it's a numeric ID (like category/product IDs) and hide it entirely
      const isNumericId = /^\d+$/.test(decodedSegment);
      if (isNumericId) {
        return; // Hide numeric ID segments from breadcrumb
      }
      
      // Get translated label for segment
      let label = decodedSegment;
      
      // Common translations
      const translations: Record<string, string> = {
        'home': t("home"),
        'category': tBreadcrumb("category"),
        'product': tBreadcrumb("product"),
        'search': tBreadcrumb("search"),
        'cart': tBreadcrumb("cart"),
        'checkout-status': tBreadcrumb("checkout-status"),
        'favourite': tBreadcrumb("favourite"),
        'user-profile': tBreadcrumb("user-profile"),
        'auth': tBreadcrumb("auth"),
        'login': tBreadcrumb("login"),
        'register': tBreadcrumb("register"),
        'forgot-password': tBreadcrumb("forgot-password"),
        'about': tBreadcrumb("about"),
        'contact': tBreadcrumb("contact"),
        'legal': tBreadcrumb("legal"),
        'services': tBreadcrumb("services"),
        'careers': tBreadcrumb("careers"),
        'who-we-are': tBreadcrumb("who-we-are"),
        'contact-us': tBreadcrumb("contact-us"),
        'cookies': tBreadcrumb("cookies"),
        'privacy': tBreadcrumb("privacy"),
        'sale-terms': tBreadcrumb("sale-terms"),
        'terms': tBreadcrumb("terms"),
        'faq': tBreadcrumb("faq"),
        'return-policy': tBreadcrumb("return-policy"),
        'shipping-info': tBreadcrumb("shipping-info"),
      };
      
      if (translations[decodedSegment]) {
        label = translations[decodedSegment];
      } else if (isNumericId) {
        // For numeric IDs, try to get the fetched name, otherwise show the ID
        label = breadcrumbData[segment] || decodedSegment;
      } else {
        // For non-numeric segments, check if it contains Arabic characters
        const hasArabic = /[\u0600-\u06FF]/.test(decodedSegment);
        
        if (hasArabic) {
          // Keep Arabic text as is
          label = decodedSegment;
        } else {
          // Capitalize and replace hyphens with spaces for English segments
          label = decodedSegment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
      }
      
      // Determine if this segment should have a clickable link
      let href = undefined;
      if (!isLast) {
        // Make non-last segments clickable, except for specific cases like 'category'
        href = decodedSegment === 'category' ? undefined : currentPath;
      }
      
      items.push({
        label,
        href,
        isLast,
        isHome: false,
      });
    });
    
    return items;
  }, [segments, locale, t, tBreadcrumb, showHome, breadcrumbData]);
  
  if (breadcrumbItems.length <= 1) {
    return null; // Don't show breadcrumb if only home or no items
  }
  
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {item.isLast || !item.href ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link 
                    href={item.href} 
                    className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
                    prefetch={false}
                  >
                    {item.isHome && <IoHome className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item.isLast && (
              <BreadcrumbSeparator>
                <ChevronRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  AutoBreadcrumb,
};
