import databaseService from "./databaseService";
import { ID } from "react-native-appwrite";

//Appwrite Database and Collection ID
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
    async getNotes() {
        const response = await databaseService.listDocuments(dbId, colId);
        if (response.error) {
            return { error: response.error }
        }

        return { data: response }
    },

    async addNote(text) {
        if (!text) {
            return { error: "Note Text Cannot Be Empty!" }
        }

        const data = {
            text: text,
            createdAt: new Date().toISOString()
        }

        const response= await databaseService.createDocument(dbId, colId, data, ID.unique())
        //Return An Error to the Frontend
        if (response?.error) {return {error: response.error}};

        return {data: response}
    },

    //Delete Note
    async deleteNote(id){
        const response=await databaseService.deleteDocument(dbId,colId,id);
        if (response.error){
            return {error:response.error}
        }

        return {success:true}
    },

    async updateNote(id,text){
        const response=await databaseService.updateDocument(dbId,colId,id,{text});
        if (response.error){
            return {error:response.error}
        }

        return {data:response}
    }


}

export default noteService