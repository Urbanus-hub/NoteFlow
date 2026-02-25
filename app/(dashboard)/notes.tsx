import ThemedButton from "@/components/ThemedButton";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedView from "@/components/ThemedView";
import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { ColorSchemeName, Pressable, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Note() {
  const colorScheme: ColorSchemeName = useColorScheme();
  console.log(colorScheme);
  const theme = colors[colorScheme ?? "light"];
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height:"100%",
        backgroundColor: theme.background.default,
      }}
    >
      <ThemedView style={{ marginTop:20,paddingHorizontal:20, flex: 1 ,borderColor:"red",borderWidth:1,width:"100%"}}>
        <ThemedView style={{ flexDirection: "row", alignItems: "center",position:"relative" }}>

        <ThemedTextInput placeholder="Search notes..." style={styles.search} />
        <Pressable style={{position:"absolute",right:10,bottom:25,width:40,height:40,justifyContent:"center",alignItems:"center",borderRadius:30 }}>

        <Ionicons name="search-outline" color={theme.text.secondary} size={30}/>
        </Pressable>
        </ThemedView>
        <ThemedView style={{marginTop:10,width:"100%",borderColor:'blue',borderWidth:3,height:"90%"}}>

        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  search: {
    width: "100%",
    paddingVertical:15,
    paddingHorizontal:10,
    borderRadius: 8,
    backgroundColor: "#00000020",
    marginBottom: 20,
  },
});
