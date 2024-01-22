"use client";
import { RecipieProvider } from "../../contexts/recipies";
import { UserProvider } from "../../contexts/user";


export const Providers = ({ children }) => {
    return (
        <UserProvider>
            <RecipieProvider>
                {children}
            </RecipieProvider>
        </UserProvider>
    );
    }