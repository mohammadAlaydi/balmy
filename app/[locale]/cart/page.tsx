import PagePadding from "@/components/page-padding";
import CartProducts from "@/features/cart/cart-products";
import OrderSummary from "@/features/cart/order-Summary";

export default function CartPage() {
  return (
    <PagePadding>
      <div className="gap-5 grid grid-cols-9 justify-center w-full xl:max-w-7xl mx-auto">
        <OrderSummary />
        <CartProducts />
      </div>
    </PagePadding>
  );
}
