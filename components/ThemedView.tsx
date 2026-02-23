import colors from "@/constants/colors";
import React, { ReactNode } from "react";
import {
  ColorSchemeName,
  StyleProp,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import { ViewProps } from "react-native/Libraries/Components/View/ViewPropTypes";
interface props extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}
const ThemedView = ({ style, children, ...rest }: props) => {
  const colorScheme: ColorSchemeName = useColorScheme();
  console.log(colorScheme);
  const theme = colors[colorScheme ?? "light"];
  // if(colorScheme)

  return (
    <View
      style={[style, { backgroundColor: theme.background.default }]}
      {...rest}
    >
      {children}
    </View>
  );
};

export default ThemedView;
