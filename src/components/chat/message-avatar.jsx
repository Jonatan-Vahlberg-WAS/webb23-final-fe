
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function MessageAvatar({ user, showBadge = false }) {
  return (
    <Avatar className="h-9 w-9 relative overflow-visible">
        <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
        <AvatarFallback>
        {user.name[0]}
        </AvatarFallback>
        {showBadge && (
            <Badge
            className="absolute top-[-4px] right-[-4px] bg-red-500 rounded-full h-6 w-1 flex scale-50" />
        )}
    </Avatar>
  );
}