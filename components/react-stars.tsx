"use client";

import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";

interface StarRatingProps {
  rating?: number;
  onChange?: (newRating: number) => void;
  edit?: boolean;
  count?: number;
  half?: boolean;
  color1?: string; // empty stars
  color2?: string; // filled stars
  className?: string;
  inline?: boolean;
  dir?: "ltr" | "rtl";
}

export default function StarRating({
  rating = 4.5,
  onChange,
  edit = false,
  count = 5,
  half = true,
  color1 = "#e4e5e9", // light gray
  color2 = "#ffd700", // yellow
  className,
  inline = false,
  dir = "ltr",
}: StarRatingProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 640);
      setIsTablet(width > 640 && width <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  let starSize = 18; // default desktop
  if (isMobile) starSize = 15;
  else if (isTablet) starSize = 18;

  const stars = (
    <span className="inline-flex align-middle" dir={dir} style={{ direction: dir }}>
      <ReactStars
        count={count}
        value={rating}
        size={starSize}
        half={half}
        color1={color1} // empty star color
        color2={color2} // filled star color (yellow)
        edit={edit}
        onChange={onChange}
      />
    </span>
  );

  if (isMobile || inline) return <span className={className}>{stars}</span>;

  return (
    <div
      className={`react-stars w-full flex rtl:justify-end ltr:justify-start ${
        className ?? ""
      }`}
    >
      {stars}
    </div>
  );
}
