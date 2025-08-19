import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: "#010101",
      },
      headerTintColor: "#FFFFFF",
      headerTitleStyle: {
        fontSize: 30,
        fontWeight: "bold",
        
      },
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
    </Stack>

}