import React from "react";
type themeContext = {
  colorScheme: "light" | "dark";
  setColorScheme: (colorScheme: "light" | "dark") => void;
  toggleColorScheme: () => void;
};
export const ThemeContext = React.createContext<themeContext>({
  colorScheme: "light" as "light" | "dark",
  setColorScheme: (colorScheme: "light" | "dark") => {},
  toggleColorScheme: () => {},
});
