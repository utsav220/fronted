import { privateAxios } from "../config/axios.config";  // Use privateAxios for auth

import { getUserLoginData } from "../Helper/LocalStorageHelper";


export const getUsersList = async () => {
    try {
        // Get user data from local storage
        const userData = getUserLoginData();

        if (!userData || !userData.token) {
            throw new Error("No authentication token found. Please log in.");
        }

        const response = await privateAxios.get("/api/auth/users_list", {
            headers: {
                Authorization: `Bearer ${userData.token}`,  // Attach token
                "Content-Type": "application/json",
            },

        });
        console.log(response.data)

        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
