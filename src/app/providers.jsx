"use client";
import { BlogProvider } from "../contexts/blog";
import { RecipieProvider } from "../contexts/recipies";
import { UserProvider } from "../contexts/user";


export const Providers = ({ children }) => {
    return (
        <UserProvider>
            <RecipieProvider>
                <BlogProvider>
                    {children}
                </BlogProvider>
            </RecipieProvider>
        </UserProvider>
    );
    }