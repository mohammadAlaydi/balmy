import React from "react";

export default function PagePadding({
  children,
  containerClassName,
}: {
  children: React.ReactNode;
  containerClassName?: string;
}) {
  return (
    <div
      className={`px-3 md:px-5 lg:px-10 py-10 gap-10 ${containerClassName}`}
    >
      {children}
    </div>
  );
}
