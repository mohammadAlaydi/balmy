import React from "react";
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
  size = 25,
  onChange,
  edit = true,
  count = 5,
  half = true,
  color1 = "#e4e5e9",
  color2 = "#ffd700",
}: StarRatingProps) {
  return (
    <div className="flex gap-1 cursor-pointer ">
      <ReactStars
        count={count}
        value={rating}
        size={size}
        half={half}
        color1={color1}
        color2={color2}
        onChange={onChange}
        edit={edit}
      />
    </div>
  );
}
