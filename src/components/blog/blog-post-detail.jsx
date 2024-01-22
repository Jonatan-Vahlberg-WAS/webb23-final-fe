"use client";

import { useBlog } from "@/contexts/blog";
import Link from "next/link";
import Comments from "./comments";

export function BlogPostDetail() {
    const blog = useBlog();
    const { post } = blog;
    if (!post) {
        return <div>Loading...</div>;
    }
    return (
    <div className="flex flex-col gap-2 md:gap-6">
        <h1 className="text-3xl font-bold">
            {post.title}
        </h1>
        <image
            alt="Blog Image"
            className="w-96 h-96 object-cover rounded-lg"
            width={400} 
            src={post.image}
            style={{
                aspectRatio: 1,
                objectFit: "cover",
            }}
            />
        <div className="space-y-2">
            <p className="text-gray-500 dark:text-gray-400">
                {post.content}
            </p>
        </div>
        <Comments />
        <Link href="/blog">
            <p className="text-blue-500 hover:underline">
                Back to list
            </p>
        </Link>
    </div>
  );
}