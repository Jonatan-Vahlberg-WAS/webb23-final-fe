import Link from "next/link";


export default function RecipieCard({ recipie }) {
    return (
        <div className="grid gap-4 relative group">
            <Link className="absolute inset-0 z-10" href={`/recipies/${recipie._id}`}>
              <span className="sr-only">View</span>
            </Link>
            <img
              src={recipie.image}
              alt="Cover image"
              className="rounded-lg object-cover w-full aspect-[1] group-hover:opacity-50 transition-opacity bg-gray-300"
              height={450}
              width={450} />
            <div className="grid gap-1">
              <h3 className="font-semibold">
                {recipie.title}
              </h3>
            </div>
            <p className="font-semibold underline underline-offset-4">
              Go to recipie
            </p>
        </div>
    )
}