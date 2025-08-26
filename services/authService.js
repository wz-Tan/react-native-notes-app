import {account} from "./appwrite"
import { ID } from "react-native-appwrite"

const authService={
    //Register User
    async register(email,password){
        try{
            const response=await account.create(ID.unique(),email,password);
            return response;
        }
        catch(error){
            return {error: error.message || "Registration Failed :( Please Try Again"}
        }
    },

    //Login
    async login(email,password){
        try{
            const response=await account.createEmailPasswordSession(email,password);
            return response;
        }
        catch(error){
            return {error: error.message || "Log In Failed :( Please Try Again"}
        }
    },
    
    //Get Logged In User
    async getUser(){
        try{
            return await account.get();
        }
        catch(error){
            return null;
        }
    },

    //Logout User
    async logout(){
        try{
            await account.deleteSession("current");
        }
        catch(error){
            return {
                error: error.message || "Logout Failed. Please Try Again"
             }
        }
    }

};

export default authService;