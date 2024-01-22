import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"


export function ConversationItem({ conversation }) {
    return (
        <div
        className="group flex items-start gap-4 p-4 border border-gray-200 rounded-l relative dark:border-gray-800">
        <Avatar className="h-9 w-9 relative overflow-visible">
          <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
          <AvatarFallback>CN</AvatarFallback>
          <Badge
            className="absolute top-[-4px] right-[-4px] bg-red-500 rounded-full h-6 w-1 flex scale-50" />
        </Avatar>
        <div className="flex-1 grid gap-1">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Olivia Davis</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Oct 08, 2023 9:15 AM</div>
          </div>
          <div className="line-clamp-1 text-sm">Hi, let's have a meeting tomorrow to discuss the project.</div>
        </div>
      </div>
    )
}