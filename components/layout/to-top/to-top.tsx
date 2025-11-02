"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";

export default function ToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] bg-black text-white rounded-full shadow-lg hover:bg-black/80 transition z-[1000]"
    >
      <FaAngleDoubleUp />
    </Button>
  );
}
