"use client";
import { Recipie } from "@/components/recipies/recipie";
import { useRecipies } from "../../../contexts/recipies";
import { useEffect } from "react";
import { useParams } from "next/navigation";


export default function RecipeDetailPage() {
    const params = useParams();
    const id = params.id;
    const recipies = useRecipies();

    useEffect(() => {
        if(id) {
            recipies.getRecipie(id);
        }
    }, [id]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 box-border">
        <Recipie 
        />
    </main>
  );
}