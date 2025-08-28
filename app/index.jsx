import PostItImage from "@/assets/images/post-it.png";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const {user,loading} = useAuth();

  //Redirect Users to Note Page on Sign In
  useEffect(()=>{
    if (!loading){
      router.replace("/notes")
    }
  },[user,loading])

  //Loading Page
  if (loading){
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#007bff"/>
      </View>
    )
  }

  return (
    <View
      style={styles.container}
    >
      <Image source={PostItImage} style={styles.image} />
      <Text style={styles.title}>Welcome to Notes App!</Text>
      <Text style={styles.subtitle}>Capture Your Thoughts Anytime, Anywhere.</Text>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/notes')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer:{
    justifyContent: "center",
    alignItems: "center",
    textAlign: "Center"
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#666",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  }
})