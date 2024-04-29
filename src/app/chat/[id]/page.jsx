"use client";
import Chat from "@/components/chat/chat";
import { useChat } from "@/contexts/chat";
import { useUser } from "@/contexts/user";
import { useParams } from "next/navigation";
import { useEffect } from "react";


export default function ChatPage() {
    const user = useUser();
    const params = useParams();
    const id = params.id;
    const chat = useChat();

    useEffect(() => {
        if(id && user.user) {
            console.log("Getting conversation");
            chat.getConversation(id)
            chat.getMessagesForConversation(id);
        }
    }, [id, user.user]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 box-border">
            <Chat />
        </main>
    );
}