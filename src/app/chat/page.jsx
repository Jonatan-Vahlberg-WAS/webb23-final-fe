import { ConversationList } from "@/components/chat/conversation-list";

export default function ChatConversationListPage(){
    return (
        <main className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-between p-24 box-border">
            <ConversationList />
        </main>
    );
}