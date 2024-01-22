"use client";
import { ChatProvider } from "@/contexts/chat";
import { BlogProvider } from "../contexts/blog";
import { RecipieProvider } from "../contexts/recipies";
import { UserProvider } from "../contexts/user";


export const Providers = ({ children }) => {
    return (
        <UserProvider>
            <RecipieProvider>
                <BlogProvider>
                    <ChatProvider>
                        {children}
                    </ChatProvider>
                </BlogProvider>
            </RecipieProvider>
        </UserProvider>
    );
    }