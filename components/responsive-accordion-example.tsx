"use client";

import React from "react";
import {
  Accordion,
  AccordionMultiple,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Custom hook to demonstrate different breakpoints
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export default function ResponsiveAccordionExample() {
  // Demonstrate different breakpoints
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">
        Responsive Accordion Example
      </h2>
      
      {/* Current Screen Size Indicator */}
      <div className="bg-blue-100 p-4 rounded-lg text-center">
        <h3 className="font-semibold mb-2">Current Screen Size:</h3>
        <div className="flex justify-center gap-4 text-sm">
          <span className={`px-3 py-1 rounded ${isMobile ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            Mobile: {isMobile ? '✓' : '✗'}
          </span>
          <span className={`px-3 py-1 rounded ${isTablet ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            Tablet: {isTablet ? '✓' : '✗'}
          </span>
          <span className={`px-3 py-1 rounded ${isDesktop ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            Desktop: {isDesktop ? '✓' : '✗'}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Single Accordion (Default Open on Large Screens)</h3>
          <Accordion defaultValue="item-1" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is this accordion?</AccordionTrigger>
              <AccordionContent>
                This accordion automatically opens on large screens (≥1024px) and closes on small screens. 
                Try resizing your browser window to see the responsive behavior in action!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does it work?</AccordionTrigger>
              <AccordionContent>
                The accordion uses a custom <code>useMediaQuery</code> hook that leverages CSS media queries 
                for efficient screen size detection. This is more performant than window resize listeners.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I customize the breakpoint?</AccordionTrigger>
              <AccordionContent>
                Yes! You can modify the media query in the useResponsiveAccordion hook. Currently it's set 
                to <code>"(min-width: 1024px)"</code> (lg breakpoint), but you can change it to any CSS media query.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Multiple Accordion (Multiple Items Open)</h3>
          <AccordionMultiple defaultValue={["item-1", "item-2"]} className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>First Item</AccordionTrigger>
              <AccordionContent>
                This is the first item that will be open by default on large screens.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Second Item</AccordionTrigger>
              <AccordionContent>
                This is the second item that will also be open by default on large screens.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Third Item</AccordionTrigger>
              <AccordionContent>
                This item will be closed by default on large screens.
              </AccordionContent>
            </AccordionItem>
          </AccordionMultiple>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Usage Instructions & Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">How to Use:</h4>
            <ul className="space-y-1">
              <li><strong>Single Accordion:</strong> Use <code>defaultValue="item-1"</code></li>
              <li><strong>Multiple Accordion:</strong> Use <code>defaultValue={["item-1", "item-2"]}</code></li>
              <li><strong>Custom Breakpoint:</strong> Modify the media query in the hook</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Benefits of useMediaQuery:</h4>
            <ul className="space-y-1">
              <li>• More performant than window resize listeners</li>
              <li>• Uses native browser media query events</li>
              <li>• Supports complex media queries</li>
              <li>• Better memory management</li>
              <li>• Consistent with CSS breakpoints</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Custom Breakpoint Examples</h3>
        <div className="text-sm space-y-2">
          <p><code>"(min-width: 768px)"</code> - Medium screens and up (md)</p>
          <p><code>"(min-width: 1024px)"</code> - Large screens and up (lg) - Default</p>
          <p><code>"(min-width: 1280px)"</code> - Extra large screens and up (xl)</p>
          <p><code>"(max-width: 767px)"</code> - Mobile only</p>
          <p><code>"(min-width: 768px) and (max-width: 1023px)"</code> - Tablet only</p>
        </div>
      </div>
    </div>
  );
}
