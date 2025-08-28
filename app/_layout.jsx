import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const HeaderLogout = () =>{
  const {user,logout} = useAuth();
  //Show logout button only when a user does exist
  return user ? (
    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  )  : (
    null
  )
}

export default function RootLayout() {
  return (
  <AuthProvider>
  <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: "#ff8c00",
      },
      headerTintColor: "#FFFFFF",
      headerTitleStyle: {
        fontSize: 30,
        fontWeight: "bold",
      },
      headerRight:()=><HeaderLogout/>,
      headerTitleAlign: "center",
      contentStyle: {
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff"
      },
    }}
    >
    {/* Set Header Title based off the page */}
    <Stack.Screen name="index" options={{title:"Home"}}/>
    <Stack.Screen name="notes" options={{headerTitle:"Notes"}}/>
    <Stack.Screen name="auth" options={{headerTitle:"Login"}}/>
    </Stack>
    </AuthProvider>
    )

}

const styles= StyleSheet.create({
  logoutButton: {
    marginRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ff3b30",
    borderRadius: 8
  },
  logoutText:{
    color: "#fff",
    fontSize: 18,
    fontWeight: "600"
  }
})