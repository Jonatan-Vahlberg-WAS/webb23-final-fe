import { Link } from "lucide-react";
import NextLink from "next/link";


export function BlogPost({ post }) {
  return (
    <div className="flex gap-4 md:gap-6">
        <img
          alt="Blog Image"
          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
          height={200}
          src={post.image}
          style={{
            aspectRatio: "200/200",
            objectFit: "cover",
          }}
          width={200} />
        <div className="space-y-2">
          <h2 className="text-xl font-bold">
            {post.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {post.content?.slice(0, 50)}...
          </p>
          <NextLink href={`/blog/${post._id}`}>
            <p className="text-blue-500 hover:underline">
              Read More
            </p>
          </NextLink>
        </div>
      </div>
  );
}