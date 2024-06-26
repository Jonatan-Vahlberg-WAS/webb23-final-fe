"use client";
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/zZw6SHtolOH
 */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useChat } from "@/contexts/chat";
import { formatTime } from "@/utils/datetime";
import { useEffect } from "react";
import { useUser } from "@/contexts/user";
import MessageAvatar from "./message-avatar";

export default function Chat() {
  const chat = useChat()
  const { messages } = chat;
  console.log(messages);
  const createMessage = (e) => {
    e.preventDefault();
    const message = e.target["message"].value;
    chat.createMessage({
      message
    })
  }
  
  return (
    <div className="flex flex-col h-[50vh] w-[75vw] bg-white m-24 p-4">
      <header
        className="flex h-14 items-center border-b">
        <h1 className="text-lg font-semibold">Chat</h1>
      </header>
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (

          <div className="flex items-start space-x-2">
        <MessageAvatar
          user={message.user} 
          />
          <div className="space-y-1">
            <div className="font-medium">{message.user.name}</div>
            <p className="text-sm">{message.message}</p>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {formatTime(message.createdAt)}
            </div>
          </div>
        </div>
          ))}
      </div>
      <footer className="border-t p-4">
        <form className="flex space-x-2" onSubmit={createMessage}>
          <Input placeholder="Type your message here." type="text" id="message" name="message" />
          <Button type="submit">Send</Button>
        </form>
      </footer>
    </div>
  );
}
