"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useBlog } from "@/contexts/blog";
import { BlogPostDetail } from "@/components/blog/blog-post-detail";


export default function PostDetailPage() {
    const params = useParams();
    const id = params.id;
    const blog = useBlog();

    useEffect(() => {
        if(id) {
            blog.getPost(id);
        }
    }, [id]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 box-border">
        <BlogPostDetail/>
    </main>
  );
}