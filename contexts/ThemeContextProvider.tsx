import React, { createContext, useState } from "react";
import { useColorScheme } from "react-native";
import { ThemeContext } from "./ThemeContext";

export default function ThemeProvider({ children }: React.PropsWithChildren) {
  
  const mode  = useColorScheme();
  const [colorScheme, setColorScheme] = useState<"light"|"dark">(mode ?? "light");
  const toggleColorScheme = () => {
    setColorScheme(colorScheme == "light" ? "dark" : "light");
    console.log("colorScheme:", colorScheme);
  };
 
  
  return (
    <ThemeContext.Provider value={{ colorScheme,setColorScheme,toggleColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
