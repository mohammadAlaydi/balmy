import { TSectionTitle } from "@/types/types";

export default function SectionTitle({ title , titleStyle}: TSectionTitle) {

  return (
    <h2 className={`font-[700] ${titleStyle}`}>{title}</h2>
  )
}
