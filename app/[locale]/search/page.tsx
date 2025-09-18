import PagePadding from "@/components/page-padding";
import SearchPopup from "@/components/search-component";
import { products } from "@/static-data/static-data";

export default function SearchPage() {
  
  return (
    <PagePadding>
      <SearchPopup products={products} />
    </PagePadding>
  );
}
