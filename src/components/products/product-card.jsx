import Link from "next/link";


export default function ProductCard({ product }) {
    return (
        <div className="grid gap-4 relative group">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Cover image"
              className="rounded-lg object-cover w-full aspect-[1] group-hover:opacity-50 transition-opacity bg-gray-300"
              height={450}
              src="/placeholder.svg"
              width={450} />
            <div className="grid gap-1">
              <h3 className="font-semibold">Basketball</h3>
              <p className="text-sm leading-none">Styles made for your game.</p>
            </div>
            <p className="font-semibold underline underline-offset-4">Shop</p>
        </div>
    )
}