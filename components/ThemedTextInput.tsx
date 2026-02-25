import { View, Text, TextInput } from 'react-native'
import React from 'react'
import colors from '@/constants/colors'
import { useColorScheme } from 'react-native'

const ThemedTextInput = (props:{placeholder?:string, style?:any}) => {
    const colorScheme=useColorScheme();
    const theme=colors[colorScheme??"light"];
  return (
    
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={theme.text.secondary}
        cursorColor={theme.text.secondary}
      style={{
        backgroundColor: theme.background.default,
        color: theme.search.text,
        padding: 10,
        borderRadius: 5,
        width:100,
        ...props.style
      }}
      >

      </TextInput>
    
  )
}

export default ThemedTextInput