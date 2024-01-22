
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/user";
import { useEffect } from "react";
import { useBlog } from "@/contexts/blog";
import { formatTime } from "@/utils/datetime";

export default function Comments () {
    const user = useUser();
    const blog = useBlog();
    const { comments, post} = blog;

    useEffect(() => {
        if(post) {
            blog.getCommentsForPost(post._id);
        }
    }, [post]);

    const createComment = (e) => {
        e.preventDefault();
        const comment = e.target.comment.value;
        blog.createComment(post._id, {
            comment,
        });
    }

  return (
    <div className="w-full max-w-2xl mt-8">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Comments</h2>
        <form className="flex flex-col space-y-4 mt-4" onSubmit={createComment}>
          <Textarea className="h-24" id="comment" placeholder="Your comment" disabled={!user.user}/>
          <Button type="submit" disabled={!user.user}>Create comment</Button>
        </form>
        <div className="space-y-4 mt-8">
            {comments.map((comment) => {
                return (
                    <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-bold">{comment.user.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400">{formatTime(comment.createdAt)}</p>
                        <p>{comment.comment}</p>
                    </div>
                )
            })}
        </div>
    </div>
  );
}