import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedView from "@/components/ThemedView";
import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ColorSchemeName,
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";

export default function Note() {
  const colorScheme: ColorSchemeName = useColorScheme();
  console.log(colorScheme);
  const theme = colors[colorScheme ?? "light"];
  const [active, setActive] = useState<"all" | "personal" | "work" | "pinned">(
    "all",
  );
  const [editingId, setEditingId] = useState<number | null>(null);
  const elemennts = [
    { label: "All", value: "all" },
    { label: "Personal", value: "personal" },
    { label: "Work", value: "work" },
    { label: "Pinned", value: "pinned" },
  ];
  const notes = [
    {
      id: 1,
      title: "Meeting Notes",
      content: "Discuss project timeline and deliverables.",
      category: "work",
      pinned: true,
      image: null,
    },
    {
      id: 2,
      title: "Grocery List",
      content: "Milk, Eggs, Bread, Butter",
      category: "personal",
      pinned: false,
      image: null,
    },
    {
      id: 3,
      title: "Project Ideas",
      content: "Brainstorm new app features and improvements.",
      category: "work",
      pinned: false,
      image: null,
    },
    {
      id: 4,
      title: "Vacation Plans",
      content: "Planning a trip to Japan",
      category: "personal",
      pinned: false,
      image: require("@/assets/images/react-logo.png"),
    },
    {
      id: 1,
      title: "Meeting Notes",
      content: "Discuss project timeline and deliverables.",
      category: "work",
      pinned: true,
      image: null,
    },
    {
      id: 2,
      title: "Grocery List",
      content: "Milk, Eggs, Bread, Butter",
      category: "personal",
      pinned: false,
      image: null,
    },
    {
      id: 3,
      title: "Project Ideas",
      content: "Brainstorm new app features and improvements.",
      category: "work",
      pinned: false,
      image: null,
    },
    {
      id: 4,
      title: "Vacation Plans",
      content: "Planning a trip to Japan",
      category: "personal",
      pinned: false,
      image: require("@/assets/images/react-logo.png"),
    },
  ];

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={{ flex: 1 }}
    >
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: theme.background.default,
        }}
      >
        <ThemedView
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            flex: 1,
            width: "100%",
          }}
        >
          <ThemedView
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "relative",
              marginTop: 20,
            }}
          >
            <ThemedTextInput
              placeholder="Search notes..."
              style={styles.search}
            />
            <Pressable
              style={{
                position: "absolute",
                right: 10,
                bottom: 25,
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
              }}
            >
              <Ionicons
                name="search-outline"
                color={theme.text.secondary}
                size={25}
              />
            </Pressable>
          </ThemedView>
          {/* content */}
          <ThemedView
            style={{
              marginTop: 10,
              width: "100%",
              height: "87%",
            }}
          >
            <ThemedView
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {elemennts.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 30,
                    backgroundColor:
                      active === item.value
                        ? theme.primary.main
                        : theme.background.default,
                    borderColor: theme.border,
                    borderWidth: active === item.value ? 0 : 1,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                  onPress={() => setActive(item.value as any)}
                >
                  <Text
                    style={{
                      color:
                        active === item.value
                          ? theme.text.primary
                          : theme.text.primary,
                      fontSize: 16,
                    }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </ThemedView>

            {/* notes cards */}
            <ThemedView
              style={{ flex: 1, marginTop: 15, position: "relative" }}
            >
              <FlatList
                data={notes}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{}}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => setEditingId(item.id)}
                    style={({ pressed }) => ({
                      width: "48%",
                      marginVertical: 10,
                      borderRadius: 16,
                      backgroundColor: theme.background.default,
                      borderWidth: 1,
                      borderColor:
                        colorScheme === "dark"
                          ? "rgba(255, 255, 255, 0.08)"
                          : "rgba(0, 0, 0, 0.08)",
                      opacity: pressed ? 0.75 : 1,
                      overflow: "hidden",
                      elevation: 3,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.12,
                      shadowRadius: 8,
                    })}
                  >
                    {/* Image section */}
                    {item.image && (
                      <Image
                        source={item.image}
                        style={{
                          width: "100%",
                          height: 140,
                          backgroundColor:
                            colorScheme === "dark"
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.05)",
                        }}
                        resizeMode="cover"
                      />
                    )}

                    {/* Content section */}
                    <ThemedView
                      style={{
                        padding: 12,
                        backgroundColor: theme.background.default,
                      }}
                    >
                      {/* Category badge */}
                      {item.category && (
                        <View
                          style={{
                            backgroundColor:
                              item.category === "work"
                                ? theme.primary.main + "25"
                                : "rgba(100, 150, 255, 0.2)",
                            paddingHorizontal: 8,
                            paddingVertical: 3,
                            borderRadius: 5,
                            alignSelf: "flex-start",
                            marginBottom: 8,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: "700",
                              color:
                                item.category === "work"
                                  ? theme.primary.main
                                  : theme.primary.main,
                              textTransform: "uppercase",
                            }}
                          >
                            {item.category}
                          </Text>
                        </View>
                      )}

                      {/* Title with pin icon */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 6,
                          gap: 8,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "800",
                            color: theme.text.primary,
                            flex: 1,
                          }}
                          numberOfLines={2}
                        >
                          {item.title}
                        </Text>

                        {/* Pin icon */}
                        {item.pinned && (
                          <Ionicons
                            name="pin"
                            size={16}
                            color={theme.text.secondary}
                            style={{ marginTop: 2 }}
                          />
                        )}
                      </View>

                      {/* Content preview */}
                      <Text
                        style={{
                          fontSize: 13,
                          color: theme.text.secondary,
                          lineHeight: 18,
                          marginBottom: 10,
                        }}
                        numberOfLines={2}
                      >
                        {item.content}
                      </Text>

                      {/* Footer - Date */}
                      <Text
                        style={{
                          fontSize: 12,
                          color: theme.text.secondary,
                          marginTop: "auto",
                        }}
                      >
                        Oct {24 - item.id}
                      </Text>
                    </ThemedView>
                  </Pressable>
                )}
              />

              {/* Floating Action Button for New Note */}
              <Pressable
                style={({ pressed }) => ({
                  position: "absolute",
                  bottom: 20,
                  right: 20,
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: theme.primary.main,
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: pressed ? 0.85 : 1,
                  elevation: 5,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                })}
                onPress={() => {
                  // TODO: Navigate to create new note screen
                  console.log("Create new note");
                }}
              >
                <Ionicons name="add" size={28} color="white" />
              </Pressable>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  search: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#00000020",
    marginBottom: 20,
  },
});
