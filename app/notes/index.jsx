import AddNoteModel from "@/components/AddNoteModal";
import noteService from "@/services/noteService";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NoteList from "../../components/NoteList";

const NoteScreen = () =>{
    const [modalVisible, setModalVisible] = useState(false)
    const [newNote, setNewNote] = useState("")
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [notes,setNotes] = useState([])

    useEffect(()=>{
        fetchNotes();
    },[])

    const fetchNotes=async()=>{
        setLoading(true);
        const response= await noteService.getNotes();

        if (response.error){
            setError(response.error)
            Alert.alert("Error", response.error)
        }

        else{
            setNotes(response.data);
            setError(null)
        }

        setLoading(false)
    }

    //Add Note
    const addNote=async ()=>{
        if (newNote.trim()==="") return;
        setLoading(true)

        const response= await noteService.addNote(newNote)
        if (response.error) 
            {Alert.alert("error",response.error)

            }
        else{
            setNotes([...notes,response.data])
        }

        setNewNote("")
        setModalVisible(false)
        setLoading(false)
    }


    return (
        <View style={styles.container}>
            <SafeAreaView style={{flex: 1}}>
            {loading? 
            (<ActivityIndicator size="large" color="#007bff"/>) 
            : 
            (
                <>
                {error && <Text style={styles.errorText}>{error}</Text> }
                <NoteList notes={notes}/>
                </>
            ) }
            {/* Note Flat List */}
            <NoteList notes={notes}/>
            <TouchableOpacity 
            style={styles.addButton}
            onPress={()=>setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>+ Add Note</Text>
            </TouchableOpacity>

            {/* Modal - Pop Up To Add Text */}
            <AddNoteModel modalVisible={modalVisible} setModalVisible={setModalVisible} newNote={newNote} setNewNote={setNewNote} addNote={addNote}/>
            </SafeAreaView>
        </View>
    )
}

export default NoteScreen

const styles=StyleSheet.create({
    container: {
        flex: 1, 
        padding: 20,
        backgroundColor: '#fff'
    },
    addButton:{
        position: "absolute",
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center"
    },
    addButtonText:{
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 16
    }
   

})