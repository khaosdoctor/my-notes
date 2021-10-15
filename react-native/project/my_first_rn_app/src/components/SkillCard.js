import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import global from '../styles/global'

export function SkillCard ({ onPress, skillName, key }) {
  return (
    <TouchableOpacity
      style={ styles.skillsButton }
      onPress={ onPress }
    >
      <Text style={ global.textColor('white') }>{ skillName }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  skillsButton: {
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 3,
    backgroundColor: '#dda011',
    alignItems: 'center'
  }
})
