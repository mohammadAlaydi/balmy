import CartSection from "@/components/CartSection";
import BreadcrumbNav from "@/components/BreadcrumbNav";

export default function CartPage() {
  return (
    <main dir="rtl" className="container mx-auto px-4 w-full">

      <CartSection
        breadcrumb={<BreadcrumbNav items={[{ label: "الرئيسية", href: "/" }, { label: "السلة" }]} />}
      />
    </main>
  );
}
