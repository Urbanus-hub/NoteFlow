import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  ColorSchemeName,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const colorScheme: ColorSchemeName = useColorScheme();
  const theme = colors[colorScheme ?? "light"];

  const SettingRow = ({ icon, label, action, chevron = false }: any) => (
    <Pressable
      onPress={action}
      style={[styles.settingRow, { borderBottomColor: theme.border }]}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: 12, flex: 1 }}
      >
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: theme.primary.main + "20" },
          ]}
        >
          <Ionicons name={icon} size={20} color={theme.primary.main} />
        </View>
        <ThemedText style={{ fontSize: 14 }}>{label}</ThemedText>
      </View>
      {chevron && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.text.secondary}
        />
      )}
    </Pressable>
  );

  const ToggleSetting = ({ icon, label, value, onToggle }: any) => (
    <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: 12, flex: 1 }}
      >
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: theme.primary.main + "20" },
          ]}
        >
          <Ionicons name={icon} size={20} color={theme.primary.main} />
        </View>
        <ThemedText style={{ fontSize: 14 }}>{label}</ThemedText>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        thumbColor={theme.primary.text}
        trackColor={{ false: theme.border, true: theme.primary.main }}
      />
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.default,
        height: "100%",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 20,
          flex: 1,
          marginBottom: -47,
          backgroundColor: theme.background.default,
        }}
      >
        {/* Header */}
        <ThemedText title={true} style={{ fontSize: 28, marginVertical: 20 }}>
          Settings
        </ThemedText>

        {/* Profile Section */}
        <ThemedView
          style={[
            styles.profileCard,
            {
              backgroundColor: theme.background.default,
              borderColor: theme.border,
            },
          ]}
        >
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.profileImage}
          />
          <ThemedView style={{ flex: 1 }}>
            <ThemedText title={true} style={{ fontSize: 16 }}>
              Alex Rivers
            </ThemedText>
            <ThemedText style={{ fontSize: 12, color: theme.text.secondary }}>
              Pro Member • iCloud Active
            </ThemedText>
          </ThemedView>
          <Pressable
            style={[
              styles.editButton,
              { backgroundColor: theme.primary.main + "20" },
            ]}
          >
            <Ionicons name="pencil" size={16} color={theme.primary.main} />
          </Pressable>
        </ThemedView>

        {/* PREFERENCES Section */}
        <ThemedText
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: theme.text.secondary,
            marginTop: 28,
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          Preferences
        </ThemedText>
        <ThemedView
          style={[
            styles.section,
            {
              backgroundColor: theme.background.default,
              borderColor: theme.border,
            },
          ]}
        >
          <ToggleSetting
            icon="sunny"
            label="Light Mode"
            value={colorScheme === "light"}
            onToggle={() => {}}
          />
          <SettingRow
            icon="palette"
            label="Accent Color"
            action={() => {}}
            chevron={true}
          />
          <SettingRow
            icon="home"
            label="Default Startup View"
            action={() => {}}
            chevron={true}
          />
        </ThemedView>

        {/* NOTIFICATIONS Section */}
        <ThemedText
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: theme.text.secondary,
            marginTop: 28,
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          Notifications
        </ThemedText>
        <ThemedView
          style={[
            styles.section,
            {
              backgroundColor: theme.background.default,
              borderColor: theme.border,
            },
          ]}
        >
          <ToggleSetting
            icon="notifications"
            label="Daily Reminders"
            value={true}
            onToggle={() => {}}
          />
          <ToggleSetting
            icon="volume-mute"
            label="Sound Effects"
            value={false}
            onToggle={() => {}}
          />
        </ThemedView>

        {/* ACCOUNT & DATA Section */}
        <ThemedText
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: theme.text.secondary,
            marginTop: 28,
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          Account & Data
        </ThemedText>
        <ThemedView
          style={[
            styles.section,
            {
              backgroundColor: theme.background.default,
              borderColor: theme.border,
            },
          ]}
        >
          <SettingRow
            icon="cloud"
            label="iCloud Syncing"
            action={() => {}}
            chevron={true}
          />
          <SettingRow
            icon="download"
            label="Export Workspace"
            action={() => {}}
            chevron={true}
          />
        </ThemedView>

        {/* SIGN OUT Section */}
        <Pressable
          style={[
            styles.signOutButton,
            {
              backgroundColor: theme.background.default,
              borderColor: theme.border,
            },
          ]}
          onPress={() => {}}
        >
          <Ionicons name="log-out" size={20} color="#EF4444" />
          <Text style={{ color: "#EF4444", fontSize: 16, fontWeight: "600" }}>
            Sign Out
          </Text>
        </Pressable>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 28,
    marginBottom: 20,
  },
});
