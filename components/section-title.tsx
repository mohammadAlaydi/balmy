import { TSectionTitle } from "@/types/types";

export default function SectionTitle({ title, titleStyle ,subtitle }: TSectionTitle) {
  return (
   <div className="flex flex-col gap-1"> <h2 className={`font-[600] ${titleStyle}`}>
      {title}
    </h2>
      {subtitle && <p className="text-sm text-center">{subtitle}</p>}</div>
  );
}
