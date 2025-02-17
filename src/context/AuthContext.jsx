import { createContext, useContext, useEffect, useState } from "react";
import { getUserLoginData, removeUserData, saveLoginDta } from "../Helper/LocalStorageHelper";

const AuthContext =createContext();

//create provider so that it can provide value to childer

export const AuthProvider =({children}) =>{
    const [token, setToken ]=useState(getUserLoginData()?.token);
    const [user, setUser]=useState(getUserLoginData()?.user);

        useEffect(()=>{
            if(user && token) {
                saveLoginDta(token, user)
            } else {
                removeUserData();
            }
        }, [user, token])

    function login(token ,user) {
        setToken(token);
        setUser(user);
    }
    function logout() {
        setToken(null);
        setUser(null);
    }
    function isLogin(){
        return token && user;
    }
    return <AuthContext.Provider value={{
        token,
        user,
        login,
        logout,
        isLogin,
    }}>{children}</AuthContext.Provider>
}



//hook to use context
export const useAuth =()=>useContext(AuthContext)