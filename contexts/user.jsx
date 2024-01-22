import AxiosClient from "@/utils/axios";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";


const defaultState = {
    user: null,
    userLoading: true,
    onLogin: () => {},
    onLogout: () => {},
    onRegister: () => {},
    getUser: () => {},
};

export const UserContext = createContext(defaultState);

export const UserProvider = ({ children }) => {

    const router = useRouter();

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(defaultState.user);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("@ACCESS_TOKEN");
        _setToken(token);
        setUserLoading(false);
    }, []);

    useEffect(() => {
        if (token) {
            getUser();
        }
    }, [token]);

    const _setToken = (token, refreshToken) => {
        if(token) {
            setToken(token);
            AxiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("@ACCESS_TOKEN", token);
            if(refreshToken) {
                localStorage.setItem("@REFRESH_TOKEN", refreshToken);
            }
            return 
        }
        delete AxiosClient.defaults.headers.common["Authorization"];
        setToken(null);
        localStorage.removeItem("@ACCESS_TOKEN");
        localStorage.removeItem("@REFRESH_TOKEN");
    }

    const getUser = async () => {
        setUserLoading(true);
        try {
            const response = await AxiosClient.get("/auth/user");
            setUser(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setUserLoading(false);
        }
    };

    const onLogin = async (email, password) => {
        try {
            const response = await AxiosClient.post("/auth/login", {
                email,
                password,
            });
            const { accessToken, refreshToken, user } = response.data;
            setUser(user);
            _setToken(accessToken, refreshToken);
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };


    const onRegister = async (name, email, password) => {
        try {
            const response = await AxiosClient.post("/auth/register", {
                name,
                email,
                password,
            });
            const { accessToken, refreshToken, user } = response.data;
            _setToken(accessToken, refreshToken);
            setUser(user);
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    const onLogout = () => {
        setUser(null);
        _setToken(null);
        router.push("/");
    };


    return (
        <UserContext.Provider
            value={{
                user,
                userLoading,
                onLogin,
                onLogout,
                onRegister,
                getUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};