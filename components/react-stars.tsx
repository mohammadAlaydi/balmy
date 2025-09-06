"use client";

import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";

interface StarRatingProps {
  rating?: number;
  size?: number;
  onChange?: (newRating: number) => void;
  edit?: boolean;
  count?: number;
  half?: boolean;
  color1?: string;
  color2?: string;
}

export default function StarRating({
  rating = 0,
  onChange,
  edit = false,
  count = 5,
  half = true,
  color1 = "#e4e5e9",
  color2 = "#ffd700",
}: StarRatingProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 640);
      setIsTablet(window.innerWidth > 640 && window.innerWidth <= 768);
    };
    // Check on mount
    checkScreenSize();
    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Determine star size based on screen size
  let starSize = 24; // Default size for desktop

  if (isMobile) {
    starSize = 19; // Smaller size for mobile
  } else if (isTablet) {
    starSize = 20; // Medium size for tablet
  }

  return isMobile ? (
    <ReactStars
      count={count}
      value={rating}
      size={starSize}
      half={half}
      color1={color1}
      color2={color2}
      onChange={onChange}
      edit={edit}
    />
  ) : (
    <div className="react-stars w-full flex rtl:justify-end ltr:justify-start">
      <ReactStars
        count={count}
        value={rating}
        size={starSize}
        half={half}
        color1={color1}
        color2={color2}
        onChange={onChange}
        edit={edit}
      />
    </div>
  );
}
