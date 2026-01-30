"use client";

import Image from "next/image";
import { BadgeCheck, Truck } from "lucide-react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    getCartProducts,
    removeFromCart,
    removeAllProductsFromCart,
    resetStatus
} from "@/store/slices/cart-slice";
import { useAppDispatch } from "@/store/hooks";
import DeleteProductComponent from "@/components/delete-product-component";
import ProductIncementOrDecrement from "@/components/product-increment-or-decrement";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import Checkout from "@/features/cart/checkout";
import { Rating, RatingButton } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";

type CartItem = {
    id: string;
    product: any;
    quantity: number;
};

export type CartSectionBalmyProps = {
    data: any;
    breadcrumb?: React.ReactNode;
};

// Cart Item Card Component
function CartItemCardBalmy({ item, onDelete }: { item: CartItem; onDelete: (id: string) => void }) {
    const tProducts = useTranslations("products");
    const [isOpen, setIsOpen] = useState(false);
    const product = item.product;

    const price = Number(
        product?.price?.value ||
        product?.price?.final_price ||
        product?.price?.base_price ||
        product?.price ||
        0
    );

    const oldPrice = (product as any)?.original_price || (product as any)?.price_regular?.value || price * 1.3;
    const discountPercent = Math.round(((oldPrice - price) / oldPrice) * 100);

    // Extract tags from product data
    const productTags = product?.sku ? [product.sku] : [];

    return (
        <div className="relative flex flex-col lg:flex-row bg-white border border-medium-gray rounded-[31px] lg:min-h-[191px] w-full p-4 lg:p-0" dir="rtl">
            <div className="flex flex-col md:flex-row w-full lg:items-center overflow-hidden">
                {/* Product Image - Far Right */}
                <div className="relative h-40 w-40 md:h-28 md:w-28 lg:h-28 lg:w-28 shrink-0 overflow-hidden rounded-lg border border-light-gray-2 bg-light-gray mx-auto lg:mr-6 lg:ml-5 mt-4 lg:mt-0">
                    <Image
                        src={product?.base_image?.original_image_url || "/images/bg.jpg"}
                        alt={product?.name || "منتج"}
                        fill
                        className="object-cover"
                        sizes="96px"
                    />
                </div>

                {/* Product Info - Flexible with controlled width */}
                <div className="flex-1 py-4 md:py-6 min-w-0 flex flex-col gap-2">
                    {/* Top Row: Brand Name with Verified Badge */}
                    <div className="flex items-center justify-center lg:justify-start gap-1">
                        <h3 className="text-xl md:text-lg lg:text-lg font-bold text-black line-clamp-1">
                            {product?.name || "جورجيو أرماني"}
                        </h3>
                        <BadgeCheck
                            className="h-5 w-5 fill-blue text-white shrink-0"
                            aria-label="موثق"
                        />
                    </div>

                    <div className="flex flex-col lg:flex-row flex-1 gap-3 lg:gap-5 items-center lg:items-start">
                        <div className="w-full lg:w-auto text-center lg:text-right">
                            {/* Product Tags - Right Side */}
                            {productTags.length ? (
                                <div className="min-w-0 text-xs md:text-sm text-medium-gray line-clamp-2 max-w-full md:max-w-56">
                                    {productTags.map((tag, index) => (
                                        <span key={index}>
                                            <span className="hover:text-black transition-colors cursor-pointer">
                                                {tag}
                                            </span>
                                            {index < productTags.length - 1 ? (
                                                <span className="mx-1">,</span>
                                            ) : null}
                                        </span>
                                    ))}
                                </div>
                            ) : null}

                            {/* Bottom Row: Prices - Right Aligned */}
                            <div className="flex items-center justify-center lg:justify-start gap-2 md:gap-3 mt-1">
                                {/* New Price (After Discount) */}
                                <div className="flex items-center gap-1 md:gap-2">
                                    <span className="text-lg md:text-xl font-bold text-black">
                                        {price.toFixed(0)}
                                    </span>
                                    <Image
                                        src="/Saudi_Riyal_Symbol.svg.png"
                                        alt="ريال"
                                        width={14}
                                        height={14}
                                        className="shrink-0"
                                    />
                                </div>

                                {/* Old Price (Before Discount) */}
                                {oldPrice > price && (
                                    <div className="flex items-center gap-1 md:gap-2">
                                        <span className="text-xs md:text-sm text-medium-gray line-through">
                                            {oldPrice.toFixed(0)}
                                        </span>
                                        <Image
                                            src="/Saudi_Riyal_Symbol.svg.png"
                                            alt="ریال"
                                            width={12}
                                            height={12}
                                            className="shrink-0 opacity-60"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="w-full lg:w-auto">
                            {/* Rating and Discount Badge - Left Side */}
                            <div className="flex shrink-0 flex-col items-center lg:items-start gap-1">
                                <div className="flex items-center gap-1 bg-gray-100 px-2 rounded-full w-fit shadow-sm">
                                    <Rating readOnly value={Math.floor(Number((product as any)?.reviews?.average_rating || product?.rating || 4.5))} max={5}>
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <RatingButton key={i} size={14} />
                                        ))}
                                    </Rating>
                                    <Badge className="bg-transparent text-gray-500 p-0 text-sm font-[550]">
                                        {(product as any)?.reviews?.average_rating || product?.rating || 4.5}
                                    </Badge>
                                </div>
                                {discountPercent > 0 && (
                                    <span className="inline-flex w-fit items-center rounded-full bg-red px-2 py-1 text-xs font-semibold text-white">
                                        {discountPercent}%-
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quantity Controls - Fixed Width */}
                <div className="flex md:min-w-[120px] md:w-36 w-full lg:w-36 shrink-0 items-center justify-center px-4 md:px-4 py-3 lg:py-0 border-t lg:border-t-0 border-medium-gray lg:border-none">
                    <div className="inline-flex items-center gap-2">
                        <ProductIncementOrDecrement product={product} quantity={item.quantity} />
                    </div>
                </div>

                {/* Price Section - Fixed Width */}
                <div className="flex md:min-w-[120px] md:w-36 w-full lg:w-36 shrink-0 items-center justify-center px-4 py-3 lg:py-0 border-t lg:border-t-0 border-medium-gray lg:border-none">
                    <div className="flex items-center justify-center gap-1 md:gap-2">
                        <span className="text-lg md:text-[22px] font-semibold leading-14 text-black-2">
                            {(price * item.quantity).toFixed(0)}
                        </span>
                        <Image
                            src="/Saudi_Riyal_Symbol.svg.png"
                            alt="ريال"
                            width={15}
                            height={15}
                            className="shrink-0"
                        />
                    </div>
                </div>

                {/* Delete Icon - Fixed Width */}
                <div className="flex w-full lg:w-20 shrink-0 items-center justify-center border-t lg:border-t-0 lg:border-r border-medium-gray py-4 lg:py-8">
                    <DeleteProductComponent
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        action={() => onDelete(item.id as string)}
                        deleteMessage="delete-product"
                    />
                </div>
            </div>
        </div>
    );
}

// Order Summary Component
function OrderSummaryBalmy({
    subtotal,
    tax,
    total,
    itemCount,
    onCheckout,
    checkoutDisabled
}: {
    subtotal: number;
    tax: number;
    total: number;
    itemCount: number;
    onCheckout: () => void;
    checkoutDisabled: boolean;
}) {
    const t = useTranslations("cart");
    const [couponCode, setCouponCode] = useState("");
    const dispatch = useDispatch();
    const { status } = useSelector((state: any) => state.cart);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (status === "success") {
            toast.success(t("order-success"));
            setOpen(false);
        } else if (status === "failed") {
            toast.error(t("order-failed"));
        }
    }, [status, t]);

    const handleCouponSubmit = () => {
        if (!couponCode.trim()) {
            toast.error(t("please-enter-coupon-code"));
            return;
        }
        if (couponCode.toUpperCase() === "SAVE20") {
            toast.success(t("coupon-applied-success"));
            setCouponCode("");
        } else {
            toast.error(t("invalid-coupon-code"));
        }
    };

    return (
        <aside className="lg:col-span-4 mt-6 lg:mt-0">
            <div className="lg:sticky lg:top-28 bg-white border border-medium-gray rounded-[32px] md:rounded-[48px] p-4 md:p-6 shadow-sm">
                {/* Free Shipping Header */}
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-black">
                        <Truck
                            className="h-5 w-5 md:h-6 md:w-6 text-white"
                            aria-label={t("shipping")}
                        />
                    </div>
                    <p className="text-lg md:text-xl font-semibold text-black">
                        {t("free-shipping")}
                        <br />
                        <span className="text-gray-400 text-[10px] md:text-xs">{t("free-shipping-over")}</span>
                    </p>
                </div>

                <h3 className="mt-4 md:mt-6 text-right text-lg md:text-xl font-bold text-black text-start">
                    {t("order-summary")}
                </h3>

                {/* Price Breakdown */}
                <div className="mt-3 md:mt-4 space-y-2 md:space-y-3 text-sm md:text-base">
                    <div className="flex items-center justify-between">
                        <span className="text-medium-gray">{t("subtotal")}</span>
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-black">{subtotal.toFixed(0)}</span>
                            <Image
                                src="/Saudi_Riyal_Symbol.svg.png"
                                alt="ريال"
                                width={14}
                                height={14}
                                className="shrink-0"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-medium-gray">{t("taxes")}</span>
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-black">{tax.toFixed(0)}</span>
                            <Image
                                src="/Saudi_Riyal_Symbol.svg.png"
                                alt="ريال"
                                width={14}
                                height={14}
                                className="shrink-0"
                            />
                        </div>
                    </div>

                    <div className="my-4 h-px w-full bg-light-gray-2" />

                    <div className="flex items-center justify-between text-black">
                        <span className="text-medium-gray">{t("total-inclusive-vat")}</span>
                        <div className="flex items-center gap-1">
                            <span className="text-lg font-bold">{total.toFixed(0)}</span>
                            <Image
                                src="/Saudi_Riyal_Symbol.svg.png"
                                alt="ريال"
                                width={16}
                                height={16}
                                className="shrink-0"
                            />
                        </div>
                    </div>
                </div>

                {/* Coupon Section */}
                <div className="mt-4 md:mt-6">
                    <p className="text-right text-sm md:text-base font-semibold text-black mb-2 md:mb-3 text-start" style={{ fontFamily: 'var(--font-sans)' }}>
                        {t("enter-coupon-code")}
                    </p>
                    <div className="relative">
                        <input
                            type="text"
                            inputMode="text"
                            placeholder={t("enter-coupon-code")}
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="h-10 md:h-12 w-full rounded-3xl border border-light-gray-2 bg-white pl-16 md:pl-20 pr-3 md:pr-4 text-right text-sm md:text-base outline-none transition focus:ring-2 focus:ring-black/10 text-start"
                            style={{ fontFamily: 'var(--font-sans)' }}
                        />
                        <button
                            type="button"
                            onClick={handleCouponSubmit}
                            className="absolute left-1 top-1 h-8 md:h-10 rounded-3xl bg-black px-3 md:px-4 text-xs md:text-sm font-semibold text-white transition hover:opacity-90"
                            style={{ fontFamily: 'var(--font-sans)' }}
                        >
                            {t("apply")}
                        </button>
                    </div>
                </div>

                {/* Complete Payment Button */}
                <Dialog
                    open={open}
                    onOpenChange={(nextOpen) => {
                        if (nextOpen && checkoutDisabled) {
                            toast.error(t("checkout-disabled-out-of-stock"));
                            return;
                        }
                        setOpen(nextOpen);
                    }}
                >
                    <DialogTitle className="hidden"></DialogTitle>
                    <DialogTrigger asChild>
                        <button
                            type="button"
                            aria-disabled={checkoutDisabled}
                            onClick={(e) => {
                                if (checkoutDisabled) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toast.error(t("checkout-disabled-out-of-stock"));
                                    return;
                                }
                                dispatch(resetStatus());
                            }}
                            className={`mt-4 md:mt-6 h-12 md:h-14 w-full rounded-xl bg-black text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black/30 text-lg md:text-xl font-normal ${checkoutDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                                }`}
                            style={{ font: 'normal normal normal 22px/40px Cairo' }}
                        >
                            {t("proceed-to-checkout")}
                        </button>
                    </DialogTrigger>

                    <DialogContent>
                        <Checkout />
                    </DialogContent>
                </Dialog>
            </div>
        </aside>
    );
}

// Main Cart Section Component
export default function CartSectionBalmy({ data, breadcrumb }: CartSectionBalmyProps) {
    const t = useTranslations("products");
    const tToast = useTranslations("toast");
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const cartItems = data?.data?.items || [];

    // Calculate totals
    const calculateTotals = () => {
        const subtotal = cartItems.reduce((total: number, item: any) => {
            const price = Number(
                item?.product?.price?.value ||
                item?.product?.price?.final_price ||
                item?.product?.price?.base_price ||
                item?.product?.price ||
                0
            );
            const quantity = Number(item?.quantity || 0);
            return total + price * quantity;
        }, 0);

        const tax = Number(data?.data?.base_tax_total || subtotal * 0.05);
        const total = subtotal + tax;

        return { subtotal, tax, total, itemCount: cartItems.length };
    };

    const { subtotal, tax, total, itemCount } = calculateTotals();
    const hasOutOfStock = cartItems.some((item: any) => item?.product?.in_stock === false);

    const handleDeleteItem = async (itemId: string) => {
        try {
            await dispatch(removeFromCart({ productId: Number(itemId) })).unwrap();
            await dispatch(getCartProducts());
            toast.success(tToast("product-deleted"));
        } catch (error) {
            console.error("Failed to remove product from cart:", error);
        }
    };

    const handleClearAll = () => {
        dispatch(removeAllProductsFromCart() as any);
    };

    if (!cartItems.length) {
        return (
            <section dir="rtl" className="w-full py-8 md:py-12 lg:py-18">
                <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6 pt-4 md:pt-6 pb-6 md:pb-10">
                    <div className="flex items-center justify-center h-full w-full min-h-[65vh]">
                        <p className="text-base md:text-lg xl:text-xl text-center">
                            {t("no-data-found")}
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section dir="rtl" className="w-full py-8 md:py-12 lg:py-18">
            <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6 pt-4 md:pt-6 pb-6 md:pb-10">
                {breadcrumb ? <div className="mb-6">{breadcrumb}</div> : null}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Cart Items (right - wide) */}
                    <div className="lg:col-span-8">
                        {/* Clear All Button */}
                        <div className="flex w-full cursor-pointer mb-5">
                            <DeleteProductComponent
                                setIsOpen={setIsOpen}
                                isOpen={isOpen}
                                action={handleClearAll}
                                text={t("clear-all-products")}
                                deleteMessage="delete-all-products"
                            />
                        </div>

                        <div className="mt-3 md:mt-4 space-y-3 md:space-y-4">
                            {cartItems.map((item: any) => (
                                <CartItemCardBalmy
                                    key={item.id}
                                    item={{
                                        id: item.id,
                                        product: item.product,
                                        quantity: item.quantity
                                    }}
                                    onDelete={handleDeleteItem}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Order Summary (left - narrow) */}
                    <OrderSummaryBalmy
                        subtotal={subtotal}
                        tax={tax}
                        total={total}
                        itemCount={itemCount}
                        onCheckout={() => { }}
                        checkoutDisabled={hasOutOfStock}
                    />
                </div>
            </div>
        </section>
    );
}
