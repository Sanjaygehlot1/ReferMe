'use client'
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { type ReactNode } from "react";
import { axiosInstance } from "../helper/axiosInstace";
import { useRouter } from "next/navigation";

type Referred = {
  _id: string;
  name: string;
  email: string;
  credits: number;
  createdAt: string;
  status: boolean;
};

export type User = {
  _id: string;
  email: string;
  name: string;
  referCount: number;
  referCode: string;
  credits: number;
  converted: number;
  referred: Referred[];
};

type AuthContextType = {
  user: User | null;
  Loading: boolean;
  logOut: () => Promise<void>;
  getUserSession : () => Promise<void>

};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {

    const router = useRouter()

    const [user, setuser] = useState<User | null>(null);
    const [Loading, setLoading] = useState(true);

    const getUserSession = async () => {
        try {
            const response = await axiosInstance.get('/users/profile')
            console.log(response.data)

            if(response.data.data){
                setuser(response.data.data[0]);

            }
            console.log(user)

        } catch (error) {

            setuser(null)
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const logOut = async () => {
        try {
            await axiosInstance.get('/users/logout');
            setuser(null);
             router.replace("/login");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        getUserSession();

    }, [])

    const values  : AuthContextType= {
        user,
        Loading,
        logOut,
        getUserSession
    }


    return (
        <AuthContext.Provider value={values}>
            {!Loading && children}
        </AuthContext.Provider>
    )
}

export const getAuth = () => {
    const context = useContext(AuthContext);


    if (!context) {
        throw new Error('getAuth must be used within an AuthProvider')
    }

    return context;
}