import colors from "@/constants/colors";
import React, { ReactNode } from "react";
import {
  ColorSchemeName,
  StyleProp,
  Text,
  TextStyle,
  useColorScheme,
} from "react-native";
interface props {
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
  title?: boolean;
}
const ThemedText = ({ title = false, style, children, ...rest }: props) => {
  const colorScheme: ColorSchemeName = useColorScheme();
  console.log(colorScheme);
  const theme = colors[colorScheme ?? "light"];

  if (title) {
    return (
      <Text
        style={[style, { color: theme.text.primary, fontWeight: "bold" }]}
        {...rest}
      >
        {children}
      </Text>
    );
  }

  return (
    <Text style={[style, { color: theme.text.secondary }]} {...rest}>
      {children}
    </Text>
  );
};

export default ThemedText;
