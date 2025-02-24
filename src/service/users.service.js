import { privateAxios } from "../config/axios.config"; // Use privateAxios for auth

export const getUsersList = async () => {
    try {
        const response = await privateAxios.get("/api/auth/users_list");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
        throw error;
    }
};
