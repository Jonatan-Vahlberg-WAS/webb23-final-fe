import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatTime } from "@/utils/datetime";
import Link from "next/link"
import MessageAvatar from "./message-avatar";


export function ConversationItem({ conversation, user }) {
    const recipient = conversation.recipients.find(r => r._id !== user._id);
    if(!recipient) {
        return null;
    }

    return (
        <div
        className="group flex items-start gap-4 p-4 border border-gray-200 rounded-l relative dark:border-gray-800">
        <MessageAvatar
          showBadge={conversation.lastMessage && !conversation.lastMessage.user === user._id}
          user={recipient} 
        />
        <div className="flex-1 grid gap-1">
          <div className="flex items-center justify-between">
            <div className="font-semibold">
              {recipient.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {formatTime(conversation.updatedAt)}
            </div>
          </div>
          <div className="line-clamp-1 text-sm">{
              conversation.lastMessage ? conversation.lastMessage.content : ""
          }</div>
        </div>
        <Link href={`/chat/${conversation._id}`}>
          <div className="absolute inset-0 z-10" />
        </Link>
      </div>
    )
}