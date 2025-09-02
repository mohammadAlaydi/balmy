# Responsive Accordion Component

This accordion component automatically adjusts its open/closed state based on screen size. On large screens (≥1024px), it opens by default, and on small screens, it closes to save space.

## Features

- **Responsive Behavior**: Automatically opens on large screens and closes on small screens
- **Media Query Detection**: Uses CSS media queries for efficient screen size detection
- **Customizable Breakpoint**: Default breakpoint is 1024px (lg), but can be customized
- **Single & Multiple Support**: Supports both single and multiple accordion modes
- **TypeScript Support**: Fully typed with proper TypeScript definitions
- **Performance Optimized**: Uses native browser media query events instead of resize listeners

## Usage

### Basic Single Accordion

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

<Accordion defaultValue="item-1" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is this accordion?</AccordionTrigger>
    <AccordionContent>
      This accordion automatically opens on large screens and closes on small screens.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>How does it work?</AccordionTrigger>
    <AccordionContent>
      It uses a custom hook that listens to window resize events.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Multiple Accordion (Multiple Items Open)

```tsx
import { AccordionMultiple, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

<AccordionMultiple defaultValue={["item-1", "item-2"]} className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>First Item</AccordionTrigger>
    <AccordionContent>
      This will be open by default on large screens.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Second Item</AccordionTrigger>
    <AccordionContent>
      This will also be open by default on large screens.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Third Item</AccordionTrigger>
    <AccordionContent>
      This will be closed by default on large screens.
    </AccordionContent>
  </AccordionItem>
</AccordionMultiple>
```

## Props

### Accordion (Single Mode)
- `defaultValue?: string` - The value of the item that should be open by default on large screens
- All other props from Radix UI Accordion.Root (except `type`, `value`, `onValueChange`)

### AccordionMultiple (Multiple Mode)
- `defaultValue?: string[]` - Array of values for items that should be open by default on large screens
- All other props from Radix UI Accordion.Root (except `type`, `value`, `onValueChange`)

## How It Works

1. **Custom Hook**: `useResponsiveAccordion` manages the responsive state
2. **Media Query Detection**: Uses `useMediaQuery` hook with CSS media queries to detect screen size
3. **Efficient Updates**: Leverages native browser media query events for better performance
4. **State Management**: Automatically opens/closes accordion based on screen size

## Customization

### Changing the Breakpoint

To change the breakpoint from 1024px to a different value, modify the `useResponsiveAccordion` hook in `components/ui/accordion.tsx`:

```tsx
// Change the media query string to your desired breakpoint
const isLargeScreen = useMediaQuery("(min-width: 768px)"); // Change to md breakpoint
```

### Custom Styling

The accordion uses Tailwind CSS classes and can be customized with additional classes:

```tsx
<Accordion 
  defaultValue="item-1" 
  className="w-full border rounded-lg shadow-sm"
>
  {/* accordion items */}
</Accordion>
```

## Example

See `components/responsive-accordion-example.tsx` for a complete example with both single and multiple accordion modes.

## Test Page

Visit `/test-responsive-accordion` to see the responsive accordion in action. Try resizing your browser window to see the responsive behavior!

## Browser Support

- Modern browsers with ES6+ support
- Requires `window` object (client-side only)
- Responsive design with CSS media queries

## Dependencies

- React 18+
- Radix UI Accordion
- Tailwind CSS
- TypeScript
