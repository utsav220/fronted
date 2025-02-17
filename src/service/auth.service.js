import { publicAxios } from "../config/axios.config";
export const createUser = async (userObject) =>{

    const result = await publicAxios.post("/users" ,userObject);
    return result.data;

}
export const loginUser = async (loginData) =>{
    const result =await publicAxios.post("/auth/login/" ,loginData);
    return result.data;
}