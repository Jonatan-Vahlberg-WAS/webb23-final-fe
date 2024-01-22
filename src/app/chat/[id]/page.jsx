"use client";
import Chat from "@/components/chat/chat";
import { useChat } from "@/contexts/chat";
import { useParams } from "next/navigation";
import { useEffect } from "react";


export default function ChatPage() {
    const params = useParams();
    const id = params.id;
    const chat = useChat();

    useEffect(() => {
        if(id) {
            console.log("Getting conversation");
            chat.getConversation(id)
            chat.getMessagesForConversation(id);
        }
    }, [id]);

    return (
        <Chat />
    );
}