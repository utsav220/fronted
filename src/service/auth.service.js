import { publicAxios } from "../config/axios.config";
import { saveLoginDta } from "../Helper/LocalStorageHelper";

export const createUser = async (userObject) => {
  const result = await publicAxios.post("/users", userObject);
  return result.data;
};

export const loginUser = async (loginData) => {
  try {
    // Ensure content type is set correctly
    const result = await publicAxios.post("/api/auth/login", loginData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    // If login is successful, store token in localStorage
    if (result.data && result.data.token && result.data.token.access) {
      // Create user object from response
      const userData = {
        is_admin: result.data.is_admin,
        is_superadmin: result.data.is_superadmin
      };
      
      // Save token and user data to localStorage
      saveLoginDta(result.data.token.access, userData);
    }
    
    return result.data;
  } catch (error) {
    console.error("Login error:", error.response || error);
    throw error;
  }
};