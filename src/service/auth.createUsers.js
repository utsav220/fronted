import axios from "axios";
import { privateAxios } from "../config/axios.config";

export const createAdmin = async (userObject) => {
    try {
        const response = await privateAxios.post("/api/auth/create-user/", userObject);
        return response.data;
    } catch (error) {
        console.error("Error creating admin:", error.response?.data || error.message);
        throw error;
    }
};
