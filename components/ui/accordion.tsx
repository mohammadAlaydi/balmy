"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { FaAngleDown } from "react-icons/fa";
import { cn } from "@/lib/utils";

// Custom hook for responsive accordion behavior using useMediaQuery
function useResponsiveAccordion(defaultValue?: string | string[]) {
  const [value, setValue] = React.useState<string | string[] | undefined>(
    defaultValue
  );

  // Use media query to detect large screens (≥1024px)
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  React.useEffect(() => {
    if (isLargeScreen && defaultValue) {
      setValue(defaultValue);
    } else if (!isLargeScreen) {
      setValue(undefined);
    }
  }, [isLargeScreen, defaultValue]);

  return [value, setValue] as const;
}
// useMediaQuery hook
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

// Single accordion component
function AccordionSingle({
  defaultValue,
  ...props
}: Omit<
  React.ComponentProps<typeof AccordionPrimitive.Root>,
  "type" | "value" | "onValueChange"
> & {
  defaultValue?: string;
}) {
  const [value, setValue] = useResponsiveAccordion(defaultValue);

  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      type="single"
      value={value as string}
      onValueChange={setValue as (value: string) => void}
      collapsible
      {...props}
    />
  );
}

// Multiple accordion component
function AccordionMultiple({
  defaultValue,
  ...props
}: Omit<
  React.ComponentProps<typeof AccordionPrimitive.Root>,
  "type" | "value" | "onValueChange"
> & {
  defaultValue?: string[];
}) {
  const [value, setValue] = useResponsiveAccordion(defaultValue);

  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      type="multiple"
      value={value as string[]}
      onValueChange={setValue as (value: string[]) => void}
      {...props}
    />
  );
}

// Main Accordion component that defaults to single

function Accordion(props: React.ComponentProps<typeof AccordionSingle>) {
  return <AccordionSingle {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          // normal accordion on small screens
          "cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          // at lg: disable interaction so it can't be collapsed
          "lg:pointer-events-none lg:cursor-default",
          className
        )}
        {...props}
      >
        {children}
        {/* caret hidden at lg */}
        <FaAngleDown className="text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200 flex lg:hidden" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",

        className
      )}
      {...props}
    >
      <div className="pt-0 pb-4">{children}</div>
    </AccordionPrimitive.Content>
  );
}

export {
  Accordion,
  AccordionSingle,
  AccordionMultiple,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
};
