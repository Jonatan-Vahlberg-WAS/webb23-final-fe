
import { RecipieList } from "@/components/recipies/recipie-list";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-between p-24 box-border">
      <RecipieList />
    </main>
  );
}

