
import { Link } from "expo-router";
import {  Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedView from "@/components/ThemedView";
import colors from "@/constants/colors";
import { ColorSchemeName, useColorScheme } from "react-native";
import ThemedText from "@/components/ThemedText";

export default function Task() {
  const colorScheme:ColorSchemeName=useColorScheme();
    console.log(colorScheme);
    const theme=colors[colorScheme??"light"];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:theme.background.default
      }}
    >

      <ThemedView>
       <ThemedText>Welcome , to task page</ThemedText>
      </ThemedView>
      
      
    </SafeAreaView>
  );
}
