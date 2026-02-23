import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Label } from '@react-navigation/elements'
import { useColorScheme } from 'react-native'
import colors from '@/constants/colors'
type ThemedButtonProps = {
  label: string;
  onPress?: () => void;
  style?: object;
}
const ThemedButton = ({label,onPress,style}: ThemedButtonProps) => {
    const mode=useColorScheme();
    const theme=colors[mode??"light"];
  return (
    <Pressable onPress={onPress} style={[style, {backgroundColor: theme.primary.main, padding: 10, borderRadius: 50}]}>
      <Text style={{color: theme.text.primary}}>{label}</Text>
    </Pressable>
  )
}

export default ThemedButton
