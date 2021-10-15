import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

export function Button ({onPress, text}) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={.8}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1e4def',
    borderRadius: 5,
    padding: 15,
    margin: 10,
    alignContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 18
  }
})
