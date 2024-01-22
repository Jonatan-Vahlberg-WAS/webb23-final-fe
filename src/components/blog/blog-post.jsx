import { Link } from "lucide-react";


export function BlogPost({ post }) {
  return (
    <div className="flex gap-4 md:gap-6">
        <img
          alt="Blog Image"
          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
          height={200}
          src="/placeholder.svg"
          style={{
            aspectRatio: "200/200",
            objectFit: "cover",
          }}
          width={200} />
        <div className="space-y-2">
          <h2 className="text-xl font-bold">The Future of AI</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Explore the potential impacts of AI on fields such as healthcare, education, and more.
          </p>
          <Link className="text-blue-500 hover:underline" href="#">
            Read More
          </Link>
        </div>
      </div>
  );
}