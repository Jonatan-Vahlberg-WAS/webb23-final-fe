import { BlogList } from "@/components/blog/blog-list";

export default function BlogListPage(){
    return (
        <main className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-between p-24 box-border">
            <BlogList />
        </main>
    );
}