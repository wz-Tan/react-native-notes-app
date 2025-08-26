import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";


//Context and Provider is Used to Pass in the same info to every component so we dont have to pass down level by level
const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        checkUser()
    },[])

    //Acquire and Set the Current User
    const checkUser = async() => {
        setLoading(true);
        const response= await authService.getUser();

        if (response.error){
            setUser(null)
        }
        else{
            setUser(response)
        }

        setLoading(false)
    }

    //Login First then Acquire User
    const login= async (email,password)=>{
        const response=await authService.login(email,password);
        if (response.error){
            return response;
        }

        await checkUser();
        return {success:true}
    }

    const register= async (email,password)=>{
        const response=await authService.register(email,password);
        if (response.error){
            return response;
        }

        //Auto Login Upon Register
        return login(email,password)
    }

    //Logout then Set Current User to Null
    const logout=async()=>{
        await authService.logout();
        setUser(null);
        await checkUser();
    }

    return (
        <AuthProvider.Provider value={{
            user,login,register,logout,loading
        }} >
            {children}
        </AuthProvider.Provider>
    )
}

//Use the Freshly Created Context
export const useAuth = () => useContext(AuthContext)
