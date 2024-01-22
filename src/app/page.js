import { ProductList } from "@/components/products/product-list";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  //redirect to /recipies
  redirect("/recipies");
  return null;
}

