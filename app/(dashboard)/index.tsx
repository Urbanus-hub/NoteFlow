import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import colors from "@/constants/colors";
import { generateDates } from "@/hooks/generateDates";
import {
  formatDay,
  formatFullDate,
  formatNumber,
  getGreeting,
} from "@/utils/dateUtils";
import { Ionicons } from "@expo/vector-icons";
import { isSameDay } from "date-fns";
import { Image } from "expo-image";
import { useCallback, useRef, useState } from "react";
import {
  ColorSchemeName,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colorScheme: ColorSchemeName = useColorScheme();
  console.log(colorScheme);
  const theme = colors[colorScheme ?? "light"];

  // generate date - expand range for infinite scroll feel
  const initialDates = generateDates(120); // Generate 120 days for infinite scroll
  const [dates, setDates] = useState(initialDates);
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log(selectedDate);
  const tasks: Boolean = false;
  const today = new Date();
  const flatListRef = useRef<FlatList>(null);

  // Handle loading more dates when reaching the end
  const handleEndReached = useCallback(() => {
    setDates((prevDates) => {
      if (prevDates.length > 0) {
        const lastDate = prevDates[prevDates.length - 1];
        const moreDates = [];

        // Add 30 more dates after the last date
        for (let i = 1; i <= 30; i++) {
          const newDate = new Date(lastDate);
          newDate.setDate(lastDate.getDate() + i);
          moreDates.push(newDate);
        }

        return [...prevDates, ...moreDates];
      }
      return prevDates;
    });
  }, []);

  // Handle loading more dates when reaching the beginning
  const handleStartReached = useCallback(() => {
    setDates((prevDates) => {
      if (prevDates.length > 0) {
        const firstDate = prevDates[0];
        const moreDates = [];

        // Add 30 more dates before the first date
        for (let i = 30; i >= 1; i--) {
          const newDate = new Date(firstDate);
          newDate.setDate(firstDate.getDate() - i);
          moreDates.push(newDate);
        }

        return [...moreDates, ...prevDates];
      }
      return prevDates;
    });
  }, []);

  // Scroll to today on mount
  const handleFlatListLayout = useCallback(() => {
    const todayIndex = dates.findIndex((date) => isSameDay(date, today));
    if (todayIndex !== -1 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: todayIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }, 100);
    }
  }, [dates, today]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: "100%",
        backgroundColor: theme.background.default,
        paddingHorizontal: 20,
      }}
    >
      <ThemedView style={[styles.container, { marginTop: 10 }]}>
        <ThemedView style={{ gap: 4 }}>
          <ThemedText title={true} style={{ fontSize: 24 }}>
            {getGreeting()} , Urbanus
          </ThemedText>
          <ThemedText title={true} style={{ fontSize: 24 }}>
            👋
          </ThemedText>
          <ThemedText>{formatFullDate(selectedDate)}</ThemedText>
        </ThemedView>
        <ThemedView>
          <Image
            source={require("@/assets/images/react-logo.png")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              borderColor: theme.primary.main,
              borderWidth: 1,
            }}
          />
        </ThemedView>
      </ThemedView>
      <View style={{ paddingVertical: 10 }}>
        <FlatList
          ref={flatListRef}
          onLayout={handleFlatListLayout}
          data={dates}
          style={{}}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.toISOString()}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          scrollEventThrottle={16}
          getItemLayout={(data, index) => ({
            length: 80, // 70 width + 10 margin (5 each side)
            offset: 80 * index,
            index,
          })}
          onScrollToIndexFailed={() => {
            // Fallback handler in case scroll fails
            setTimeout(() => {
              const todayIndex = dates.findIndex((date) =>
                isSameDay(date, today),
              );
              if (todayIndex !== -1 && flatListRef.current) {
                flatListRef.current?.scrollToIndex({
                  index: todayIndex,
                  animated: false,
                  viewPosition: 0.5,
                });
              }
            }, 100);
          }}
          onScroll={(event) => {
            const contentOffsetX = event.nativeEvent.contentOffset.x;
            // If scrolled to the very beginning, load more dates
            if (contentOffsetX < 50) {
              handleStartReached();
            }
          }}
          renderItem={({ item }) => {
            const selected = isSameDay(item, selectedDate);
            const isToday = isSameDay(item, today);

            return (
              <Pressable
                onPress={() => setSelectedDate(item)}
                style={[
                  styles.dateContainer,
                  isToday &&
                    !selected && {
                      backgroundColor: theme.primary.main,
                      borderWidth: 0,
                    },
                  selected && {
                    backgroundColor: theme.primary.main,
                    borderWidth: 0,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    !isToday && !selected && { color: theme.text.secondary },
                    (isToday || selected) && { color: "white" },
                  ]}
                >
                  {formatDay(item)}
                </Text>

                <Text
                  style={[
                    styles.dateText,
                    !isToday && !selected && { color: theme.text.primary },
                    (isToday || selected) && { color: "white" },
                  ]}
                >
                  {formatNumber(item)}
                </Text>
                {isToday && !selected ? (
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "800",
                      fontSize: 24,
                      color: "white",
                    }}
                  >
                    •
                  </Text>
                ) : null}
              </Pressable>
            );
          }}
        />
      </View>
      {/* render task if any */}
      {tasks ? (
        <ThemedView style={{ flex: 1 }}>
          <ThemedView
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
              marginBottom: 16,
            }}
          >
            <ThemedText title={true} style={{ fontSize: 20 }}>
              Today's flow
            </ThemedText>
            <ThemedView>
              <Text style={{ color: theme.primary.main, fontWeight: "bold" }}>
                3 ITEMS
              </Text>
            </ThemedView>
          </ThemedView>
          <ScrollView
            style={{ flex: 1, gap: 10 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Quick Note Card */}
            <ThemedView
              style={[
                styles.card,
                {
                  backgroundColor: theme.background.paper,
                  borderColor: theme.border,
                  borderWidth: 1,
                },
              ]}
            >
              <ThemedView
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <ThemedView
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Ionicons
                    name="document-text"
                    size={16}
                    color={theme.primary.main}
                  />
                  <ThemedText
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: theme.text.secondary,
                    }}
                  >
                    QUICK NOTE
                  </ThemedText>
                </ThemedView>
                <ThemedText
                  style={{
                    fontSize: 12,
                    color: theme.text.link,
                  }}
                >
                  Edited 2h ago
                </ThemedText>
              </ThemedView>

              <ThemedText
                title={true}
                style={{ fontSize: 18, marginBottom: 8 }}
              >
                Inspiration for Rebrand
              </ThemedText>

              <ThemedText
                style={{
                  fontSize: 14,
                  color: theme.text.secondary,
                  lineHeight: 20,
                }}
              >
                Focus on the fluidity of time. Use gradients that represent the
                transition from morning to...
              </ThemedText>
            </ThemedView>

            {/* Task Item */}
            <ThemedView
              style={[
                styles.card,
                { flexDirection: "row", alignItems: "center", gap: 12 },
                {
                  backgroundColor: theme.background.paper,
                  borderColor: theme.border,
                  borderWidth: 1,
                  paddingVertical: 15,
                },
              ]}
            >
              <Pressable>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: theme.text.secondary,
                  }}
                />
              </Pressable>

              <ThemedView style={{ flex: 1 }}>
                <ThemedText
                  title={true}
                  style={{ fontSize: 16, marginBottom: 4 }}
                >
                  Review Q4 Product Roadmap
                </ThemedText>
                <ThemedText
                  style={{ fontSize: 12, color: theme.text.secondary }}
                >
                  By High • 4:00 PM
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ScrollView>
        </ThemedView>
      ) : (
        <ThemedView
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            paddingVertical: 40,
            marginTop: 20,
          }}
        >
          <ThemedView
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={{
                width: 150,
                height: 150,
                borderRadius: 200,
                backgroundColor: theme.border,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: theme.border,
              }}
            >
              <Ionicons
                name="cloud-offline"
                size={64}
                color={theme.primary.main}
              />
            </View>
          </ThemedView>

          <ThemedView style={{ alignItems: "center", gap: 8 }}>
            <ThemedText
              title={true}
              style={{ fontSize: 24, textAlign: "center" }}
            >
              Nothing here yet
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 14,
                color: theme.text.secondary,
                textAlign: "center",
              }}
            >
              Plan your day by adding a note,
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 14,
                color: theme.text.secondary,
                textAlign: "center",
              }}
            >
              task, or a quick reminder.
            </ThemedText>
          </ThemedView>

          <ThemedView style={{ width: "100%", gap: 12 }}>
            <Pressable
              onPress={() => void 0}
              style={{
                backgroundColor: theme.primary.main,
                paddingHorizontal: 24,
                paddingVertical: 14,
                borderRadius: 30,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Ionicons name="document-text" size={18} color="white" />
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Add Note
              </Text>
            </Pressable>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <Pressable
                onPress={() => void 0}
                style={{
                  flex: 1,
                  backgroundColor: theme.border,
                  borderWidth: 1,
                  borderColor: theme.border,
                  paddingVertical: 18,
                  borderRadius: 12,
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={theme.primary.main}
                />
                <Text
                  style={{
                    color: theme.primary.main,
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  TODO
                </Text>
              </Pressable>

              <Pressable
                onPress={() => void 0}
                style={{
                  flex: 1,
                  backgroundColor: theme.border,
                  borderWidth: 1,
                  borderColor: theme.border,
                  paddingVertical: 18,
                  borderRadius: 12,
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Ionicons
                  name="notifications"
                  size={24}
                  color={theme.primary.main}
                />
                <Text
                  style={{
                    color: theme.primary.main,
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  REMINDER
                </Text>
              </Pressable>
            </View>
          </ThemedView>
        </ThemedView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "15%",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateContainer: {
    width: 70,
    height: 90,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    borderColor: "#9CA3AF",
    borderWidth: 1,
  },
  selectedDate: {
    backgroundColor: "#1D4ED8",
  },
  dayText: {
    fontSize: 14,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  selectedText: {
    color: "white",
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  joinCallBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
