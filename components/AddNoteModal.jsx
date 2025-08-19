import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const AddNoteModal = ({modalVisible, setModalVisible, newNote, setNewNote, addNote}) => {
    return ( 
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent
            onRequestClose={()=>setModalVisible(false)}
            >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add a New Note</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Enter Note..."
                        placeholderTextColor={"#aaa"}
                        value={newNote}
                        onChangeText={setNewNote}
                    />
                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.cancelButton} onPress={()=>setModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={addNote}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            </Modal>
     );
}
 
export default AddNoteModal;

const styles=StyleSheet.create({
     modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent:{
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 20
    },
    modalTitle:{
        fontSize: 24,
        fontWeight: "bold",
        color: "#000000",
        marginBottom: 12,
        textAlign: "center"
    },
    input:{
        padding: 10,
        borderColor: "#ccc",
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 12
    },
    modalButtons:{
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    cancelButton:{
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius:5,
        flex:1,
        marginRight: 10,
        alignItems: "center"
    },
    cancelButtonText:{
        fontSize: 16,
    },
    saveButtonText:{
        fontSize: 16,
        color: "#ffffff"
    },
    saveButton:{
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius:5,
        flex:1,
        alignItems: "center"
    }
})