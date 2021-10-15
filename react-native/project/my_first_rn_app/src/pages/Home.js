import React, { useEffect, useState } from 'react'
import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  FlatList
} from 'react-native'
import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'
import globalStyle from '../styles/global'


export function Home () {
  const [skill, setSkill] = useState('')
  const [skills, setSkills] = useState([])
  useEffect(() => this.textInput.clear() , [skills])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View nativeID="header">
        <Text style={[globalStyle.textColor('white'), globalStyle.title()]}>
          Olá, Lucas!
        </Text>
        <TextInput
          style={[globalStyle.input, globalStyle.textColor('white')]}
          placeholder="Adicionar Skill"
          placeholderTextColor="#555"
          onChangeText={setSkill}
          ref={(input) => { this.textInput = input }}
        />
        <Button
          text="Add"
          onPress={handleSkillAdd(skill, setSkills)}
        />
      </View>

      <View nativeID='my-skills'>
        <Text style={[globalStyle.textColor('white'), globalStyle.title(30)]}>
          Minhas Skills
        </Text>

        <FlatList
          data={skills}
          keyExtractor={(_, index) => index}
          renderItem={({item: skillItem, index},) => (
            <SkillCard
              skillName={skillItem}
              onPress={handleSkillRemove(index, setSkills)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />

      </View>
    </SafeAreaView>
  )
}

function handleSkillAdd (skill, setSkills) {
  return () => {
    if (skill) setSkills(oldState => [...oldState, skill])
  }
}

function handleSkillRemove (index, setSkills) {
  return () => {
    setSkills(oldState => oldState.filter((_, i) => i !== index))
  }
}


