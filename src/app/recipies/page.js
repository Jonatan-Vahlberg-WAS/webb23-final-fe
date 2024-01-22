import { BlogList } from "@/components/blog/blog-list";
import { ConversationList } from "@/components/chat/conversation-list";
import { ProductList } from "@/components/products/product-list";
import { RecipieList } from "@/components/recipies/recipie-list";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RecipieList />
    </main>
  );
}

