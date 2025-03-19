import { IUser } from "../../types/interface";
import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;


export const registerUser = async (userData: Partial<IUser>) => {
    try {
        await axios.post(`${API}/auth/signup`, userData);
        return "SUCCESS_REGISTER";
        
    } catch (error) {
        console.log(error)
        throw new Error("Error al registrar el usuario");
    }
}