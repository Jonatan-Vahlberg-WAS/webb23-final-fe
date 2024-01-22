"use client";
import { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from './user';

const defaultState = {
    conversations: [],
    conversation: null,
    conversationsLoading: true,
    conversationLoading: true,
    messages: [],
    messagesLoading: true,
    getConversations: () => {},
    getConversation: () => {},
    createConversation: (conversation) => {},
    deleteConversation: (id) => {},
    getMessagesForConversation: () => {},
    createMessage: (message) => {},
    deleteMessage: (id) => {},
}

const ChatContext = createContext(defaultState);

const ChatProvider = ({ children }) => {
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
            const response = await AxiosClient.get("/conversations");
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
            const response = await AxiosClient.get(`/conversations/${id}`);
            setConversation(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setConversationLoading(false);
        }
    }

    const createConversation = async (data) => {
        try {
            const response = await AxiosClient.post("/conversations", data);
            setConversations([...conversations, response.data]);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteConversation = async (id) => {
        try {
            await AxiosClient.delete(`/conversations/${id}`);
            setConversations(conversations.filter((conversation) => conversation._id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const getMessagesForConversation = async (id) => {
        setMessagesLoading(true);
        try {
            const response = await AxiosClient.get(`/conversations/${id}/messages`);
            setMessages(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setMessagesLoading(false);
        }
    }

    const createMessage = async (data) => {
        try {
            const response = await AxiosClient.post(`/conversations/${conversation._id}/messages`, data);
            setMessages([...messages, response.data]);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteMessage = async (id) => {
        try {
            await AxiosClient.delete(`/conversations/${conversation._id}/messages/${id}`);
            setMessages(messages.filter((message) => message._id !== id));
        }
        catch (error) {
            console.log(error);
        }
    }
    if(!user.user) return (
        <ChatContext.Provider value={defaultState}>
            {children}
        </ChatContext.Provider>
    )
    return (
        <ChatContext.Provider
            value={{
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
            }}
        >
            {children}
        </ChatContext.Provider>
    );

}
