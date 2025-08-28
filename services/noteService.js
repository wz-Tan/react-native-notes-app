import databaseService from "./databaseService";
import { ID, Query } from "react-native-appwrite";

//Appwrite Database and Collection ID
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
    async getNotes(userId) {
        if (!userId) {
            console.log("Error", "Missing User ID");
            return {
                data: [],
                error: "User ID Is Missing"
            }
        }

        try {
            //Query the Notes that Belong to the User
            const response = await databaseService.listDocuments(dbId, colId, [Query.equal('user_id', userId)]);
            return response;
        }
        catch (error) {
            console.log("Error fetching notes", error.message)
            return {data:[], error: error.message}
        }
    },

    async addNote(user_id, text) {
        if (!text) {
            return { error: "Note Text Cannot Be Empty!" }
        }

        const data = {
            text: text,
            createdAt: new Date().toISOString(),
            user_id: user_id
        }

        const response = await databaseService.createDocument(dbId, colId, data, ID.unique())
        //Return An Error to the Frontend
        if (response?.error) { return { error: response.error } };

        return { data: response }
    },

    //Delete Note
    async deleteNote(id) {
        const response = await databaseService.deleteDocument(dbId, colId, id);
        if (response.error) {
            return { error: response.error }
        }

        return { success: true }
    },

    async updateNote(id, text) {
        const response = await databaseService.updateDocument(dbId, colId, id, { text });
        if (response.error) {
            return { error: response.error }
        }

        return { data: response }
    }


}

export default noteService