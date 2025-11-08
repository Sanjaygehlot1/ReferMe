import { axiosInstance } from "@/helper/axiosInstace"
import { userData } from "@/app/(public)/signup/page"
import { LoginData } from "@/app/(public)/login/page";

export const signUp = async (data : userData) => {
    try {
        if(!data){
            return;
        }
       const response =  await axiosInstance.post('/users/sign-up',data)
       return response.data.data;

    } catch (error) {
        console.log(error)
        throw error
    }
}

export const logIn = async (data : LoginData) => {
    try {
        if(!data){
            return;
        }
       const response =  await axiosInstance.post('/users/login',data)
       return response.data.data;

    } catch (error) {
        console.log(error)
        throw error
    }
}

export const buyProduct = async () => {
    try {
       const response =  await axiosInstance.get('/users/buy-product')
       return response.data.data;

    } catch (error) {
        console.log(error)
        throw error
    }
}