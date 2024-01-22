
import { RecipieList } from "@/components/recipies/recipie-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RecipieList />
    </main>
  );
}

