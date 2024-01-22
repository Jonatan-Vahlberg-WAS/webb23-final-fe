
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/user";
import { useRecipies } from "@/contexts/recipies";
import { useEffect } from "react";

export default function Reviews () {
    const user = useUser();
    const recipies = useRecipies();
    const { recipieReviews, recipie} = recipies;

    useEffect(() => {
        if(recipie) {
            recipies.getRecipieReviews(recipie._id);
        }
    }, [recipie]);

    const createReview = (e) => {
        e.preventDefault();
        const review = e.target.review.value;
        recipies.createRecipieReview(recipie._id, {
            review,
        });
    }

  return (
    <div className="w-full max-w-2xl mt-8">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Reviews</h2>
        <form className="flex flex-col space-y-4 mt-4" onSubmit={createReview}>
          <Textarea className="h-24" id="review" placeholder="Your review" disabled={!user.user}/>
          <Button type="submit" disabled={!user.user}>Submit Review</Button>
        </form>
        <div className="space-y-4 mt-8">
            {recipieReviews.map((review) => {
                return (
                    <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-bold">{review.user.name}</h3>
                        <p>{review.review}</p>
                    </div>
                )
            })}
        </div>
    </div>
  );
}