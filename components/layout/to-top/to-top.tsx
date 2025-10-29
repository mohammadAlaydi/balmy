"use client";

import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";

export default function ToTop() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] bg-black text-white rounded-full shadow-lg hover:bg-black/80 transition z-[1000]"
    >
      <FaAngleDoubleUp />
    </Button>
  );
}
