import axios from "axios";

const baseurl="http://127.0.0.1:8000/api/";

export const publicAxios =axios.create({
    baseURL:baseurl,
    timeout:5000,
    
})