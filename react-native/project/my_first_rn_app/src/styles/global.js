import { StyleSheet } from 'react-native'

export default global = StyleSheet.create({
  textColor: (color = 'white') => ({
    color
  }),
  title: (font = 45) => ({
    padding: 20,
    fontSize: font,
    textAlign: 'left',
    fontWeight: 'bold'
  }),
  textSize: (size) => ({ fontSize: size }),
  input: {
    backgroundColor: '#1f1e25',
    borderRadius: 10,
    fontSize: 20,
    margin: 10,
    padding: Platform.OS === 'ios' ? 15 : 10
  },
})
