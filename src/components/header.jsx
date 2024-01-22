"use client";
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/n6dQrY2c0HB
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation";
import { UserIcon } from "lucide-react";
import { useUser } from "../../contexts/user";

export function Header() {
  const pathname = usePathname();
  const user = useUser();
  if(pathname.startsWith("/login")) {
    return null;
  }
  return (
    (<header className="flex justify-between items-center py-4 px-6">
      <div className="flex items-center gap-4">
        <Link className="flex items-center gap-2" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Acme Inc</span>
        </Link>
        <nav className="sm:flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#">
            Recipes
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#">
            Blog
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#">
            Chat
          </Link>
        </nav>
      </div>
      {!user.user && <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
      </div>}
      {user.user && <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <UserIcon className="h-6 w-6" />
          <span className="text-sm font-medium">{
            user.user.name
          }</span>
        </div>
        <Button variant="outline">Logout</Button>
      </div>}
    </header>)
  );
}


function MountainIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>)
  );
}
