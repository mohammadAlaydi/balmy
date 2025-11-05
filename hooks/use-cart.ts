"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

import {
  getCartProducts,
  getOrderById,
  resetStatus,
} from "@/store/slices/cart-slice";
import type { AppDispatch, RootState } from "@/store/store";

export default function useCart() {
  const t = useTranslations("cart");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = useParams<{ id?: string }>();

  const { data, isLoading, saveOrderData, orderDetails } = useSelector(
    (state: RootState) => state.cart
  );

  const [isOpen, setIsOpen] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                             🛒 Fetch Cart on Mount                         */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    router.refresh();
    dispatch(resetStatus());

    if (!isLoading && !data) {
      dispatch(getCartProducts());
    }
  }, [dispatch, isLoading, data, router]);

  /* -------------------------------------------------------------------------- */
  /*                          🧾 Fetch Order by ID (if any)                     */
  /* -------------------------------------------------------------------------- */
  useLayoutEffect(() => {
    if (id) {
      dispatch(getOrderById(id));
      dispatch(getCartProducts());
    }
  }, [id, dispatch]);

  /* -------------------------------------------------------------------------- */
  /*                                   Return                                   */
  /* -------------------------------------------------------------------------- */
  return {
    id,
    t,
    data,
    isOpen,
    setIsOpen,
    dispatch,
    isLoading,
    saveOrderData,
    orderDetails,
  };
}
