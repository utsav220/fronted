export function saveLoginDta(token,user) {
    localStorage.setItem("token" ,token);
    localStorage.setItem("user" ,JSON.stringify(user));
    }
    export function getUserLoginData(){
      const token=  localStorage.getItem("token")
      const user =localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):null;
    
       if(user && token) {
        return {
            token,
            user,
        }
       } else return null;
    }
    
    //remove userInfor from local
    
    export function removeUserData(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }