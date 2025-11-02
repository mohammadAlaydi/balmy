"use client";

import CartProduct from "@/components/cart-product";
import OrderSummary from "@/features/cart/order-Summary";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getCartProducts,
  removeAllProductsFromCart,
} from "@/store/slices/cart-slice";
import Loading from "@/components/loading";
import { useTranslations } from "next-intl";
import PageWrapper from "@/components/page-wrapper";
import { useRouter } from "next/navigation";
import { resetStatus } from "@/store/slices/cart-slice";
import DeleteProductComponent from "@/components/delete-product-component";
export default function page() {
  const t = useTranslations("cart");
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, isLoading, status, cartStatus } = useSelector(
    (state: any) => state.cart
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    router.refresh();
    resetStatus();
    if (!isLoading && !data) {
      dispatch(getCartProducts() as any);
    }
  }, [dispatch, isLoading, data]);

  // if (isLoading) {
  //   return <Loading fullScreen={true} variant="spinner" size="xl" />;
  // }

  return (
    <PageWrapper>
      {data && data?.data?.items?.length > 0 ? (
        <div className="grid grid-cols-12 xl:max-w-7xl mx-auto gap-5 justify-between">
          <OrderSummary data={data} />
          <div
            className={`cart-poroduct col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col gap-3 items-end h-full`}
          >
            <div className="flex w-full cursor-pointer mb-5">
              <DeleteProductComponent
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                action={() => dispatch(removeAllProductsFromCart() as any)}
                text="مسح جميع المنتجات"
              />
            </div>
            {data?.data?.items &&
              data.data.items.length > 0 &&
              data.data.items.map(
                (item: any) =>
                  item?.product?.in_stock == true && (
                    <CartProduct
                      key={item?.product?.id}
                      product={item?.product}
                      quantity={item?.quantity}
                      deletedProductId={item?.id}
                    />
                  )
              )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full w-full min-h-[65vh]">
          <p className="text-base md:text-lg xl:text-xl text-center">
            {t("no-data-found")}
          </p>
        </div>
      )}
    </PageWrapper>
  );
}
