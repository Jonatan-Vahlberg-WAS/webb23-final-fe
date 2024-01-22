"use client";
import { createContext, useState, useContext } from 'react';
import { useUser } from './user';
import Axios from '@/utils/axios';
import { useRouter } from 'next/navigation';

const defaultState = {
    conversations: [],
    conversation: null,
    conversationsLoading: true,
    conversationLoading: true,
    messages: [],
    messagesLoading: true,
    getConversations: () => {},
    getConversation: (id) => {},
    createConversation: (conversation) => {},
    deleteConversation: (id) => {},
    getMessagesForConversation: () => {},
    createMessage: (message) => {},
    deleteMessage: (id) => {},
}

const ChatContext = createContext(defaultState);

const ChatProvider = ({ children }) => {
    const router = useRouter();
    const user = useUser();
    const [conversations, setConversations] = useState(defaultState.conversations);
    const [conversation, setConversation] = useState(defaultState.conversation);
    const [conversationsLoading, setConversationsLoading] = useState(defaultState.conversationsLoading);
    const [conversationLoading, setConversationLoading] = useState(defaultState.conversationLoading);
    const [messages, setMessages] = useState(defaultState.messages);
    const [messagesLoading, setMessagesLoading] = useState(defaultState.messagesLoading);

    const getConversations = async () => {
        setConversationsLoading(true);
        try {
            const response = await Axios.get("/chat/conversations");
            setConversations(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setConversationsLoading(false);
        }
    }

    const getConversation = async (id) => {
        setConversationLoading(true);
        try {
            const response = await Axios.get(`/chat/conversations/${id}`);
            setConversation(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setConversationLoading(false);
        }
    }

    const createConversation = async (data) => {
        try {
            const response = await Axios.post("/chat/conversations", data);
            setConversations([...conversations, response.data]);
            router.push(`/chat/${response.data._id}`);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteConversation = async (id) => {
        try {
            await Axios.delete(`/conversations/${id}`);
            setConversations(conversations.filter((conversation) => conversation._id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const getMessagesForConversation = async (id) => {
        setMessagesLoading(true);
        try {
            const response = await Axios.get(`/chat/conversations/${id}/messages`);
            setMessages(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setMessagesLoading(false);
        }
    }

    const createMessage = async (data) => {
        try {
            const response = await Axios.post(`/chat/conversations/${conversation._id}/messages`, data);
            setMessages([...messages, response.data]);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteMessage = async (id) => {
        try {
            await Axios.delete(`/chat/messages/${id}`);
            setMessages(messages.filter((message) => message._id !== id));
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <ChatContext.Provider
            value={user.user ? {
                conversations,
                conversation,
                conversationsLoading,
                conversationLoading,
                messages,
                messagesLoading,
                getConversations,
                getConversation,
                createConversation,
                deleteConversation,
                getMessagesForConversation,
                createMessage,
                deleteMessage,
            } : defaultState}
        >
            {children}
        </ChatContext.Provider>
    );

}

const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}


export { ChatProvider, useChat };