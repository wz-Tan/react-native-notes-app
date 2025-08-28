import AddNoteModel from "@/components/AddNoteModal";
import noteService from "@/services/noteService";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NoteList from "../../components/NoteList";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

const NoteScreen = () => {
    const router = useRouter();
    const {user, loading:authloading} = useAuth()
    const [modalVisible, setModalVisible] = useState(false)
    const [newNote, setNewNote] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [notes, setNotes] = useState([])

    useEffect(()=>{
        //Switch Pages if Not Loading and No User
        if (!authloading && !user){
            router.replace('/auth')
        }
    },[user,authloading])

    useEffect(() => {
        if (user){
            fetchNotes();
        }
    }, [user])

    const fetchNotes = async () => {
        setLoading(true);
        const response = await noteService.getNotes(user.$id);

        if (response.error) {
            setError(response.error)
            Alert.alert("Error", response.error)
        }

        else {
            setNotes(response.data);
            setError(null)
        }

        setLoading(false)
    }

    //Add Note
    const addNote = async () => {
        if (newNote.trim() === "") return;
        setLoading(true)

        const response = await noteService.addNote(user.$id,newNote)
        if (response.error) {
            Alert.alert("error", response.error)

        }
        else {
            setNotes([...notes, response.data])
        }

        setNewNote("")
        setModalVisible(false)
        setLoading(false)
    }

    //Delete Note
    const deleteNote = async (id) => {
        Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    const response = await noteService.deleteNote(id);
                    if (response.error) {
                        Alert.alert("Error!", response.error)
                    }
                    else {
                        setNotes(notes.filter((note) => note.$id !== id))
                    }
                }
            }
        ])
    }

    const editNote = async (id, newText) => {
        if (!newText.trim()) {
            Alert.alert("Error", "Note text cannot be empty.");
            return;
        }

        const response = await noteService.updateNote(id, newText);
        if (response.error) {
            Alert.alert("Error!",response.error)
        }
        else {
            //Change the text of the matched note, or else just leave as is
            setNotes((prevNotes) => prevNotes.map(
                (note) => note.$id === id ? { ...note, text: response.data.text } : note
            )
            )
        }
    }


    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                {loading ?
                    (<ActivityIndicator size="large" color="#007bff" />)
                    :
                    (
                        <>
                            {error && <Text style={styles.errorText}>{error}</Text>}
                            {notes.length===0 ? (<Text style={styles.emptyText}>Write Something...</Text>) : (<NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />)}
                            
                        </>
                    )}

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.addButtonText}>+ Add Note</Text>
                </TouchableOpacity>

                {/* Modal - Pop Up To Add Text */}
                <AddNoteModel modalVisible={modalVisible} setModalVisible={setModalVisible} newNote={newNote} setNewNote={setNewNote} addNote={addNote} />
            </SafeAreaView>
        </View>
    )
}

export default NoteScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    addButton: {
        position: "absolute",
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center"
    },
    addButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 16
    },
    emptyText: {
        color: "black",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 24,
        fontWeight: "bold"
    }
})