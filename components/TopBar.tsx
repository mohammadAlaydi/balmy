"use client";

export type TopBarProps = {
  position?: "fixed" | "static";
};

export default function TopBar({ position = "fixed" }: TopBarProps) {
  const isFixed = position === "fixed";

  return (
    <div
      className={
        isFixed
          ? "fixed top-0 z-[60] w-screen h-[54px] bg-[var(--color-black)] opacity-100"
          : "relative z-[60] w-full h-[54px] bg-[var(--color-black)] opacity-100"
      }
      style={
        isFixed
          ? {
              left: "50%",
              right: "50%",
              marginLeft: "-50vw",
              marginRight: "-50vw",
              width: "100vw",
            }
          : undefined
      }
    >
      <div className="relative w-full h-full max-w-[1920px] mx-auto flex items-center justify-center" style={{ gap: "50px" }}>
        {/* First announcement - خصم 15% */}
        <div 
          className="text-[20px] leading-[37px] text-right whitespace-nowrap font-normal"
          style={{ fontFamily: "var(--font-cairo)" }}
        >
          <span className="text-[var(--color-red)]">اليـــوم فقـــط خصـــم</span>{" "}
          <span className="text-[var(--color-white)]">15% على كود 2349050</span>
        </div>
        
        {/* Second announcement - الشحن المجاني */}
        <div 
          className="text-[20px] leading-[37px] text-right whitespace-nowrap font-normal"
          style={{ fontFamily: "var(--font-cairo)" }}
        >
          <span className="text-[var(--color-white)]">الشحن المجاني فوق</span>{" "}
          <span className="text-[var(--color-red)]">ال 299 ريال</span>
        </div>
      </div>
    </div>
  );
}

