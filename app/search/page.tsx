import productsData from "@/data/products.json";
import SearchClient from "./SearchClient";

type Product = {
  code: string;
  name: string;
  unchin: string;
  genka: string;
  kanrihi: string;
  oroshi: string;
};

export default function SearchPage() {
  return <SearchClient products={productsData as Product[]} />;
}
