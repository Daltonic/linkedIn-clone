import React, { useState } from 'react'
import { View } from 'react-native'
import StyleSheet from 'react-native-media-query'
import { Text, Tab, TabView } from 'react-native-elements'

const Footer = () => {
  const [index, setIndex] = useState(null)
  return (
    <View>
      <Tab value={index} onChange={setIndex}>
        <Tab.Item title="recent" />
        <Tab.Item title="favorite" />
        <Tab.Item title="cart" />
      </Tab>
    </View>
  )
}

export default Footer

const { ids, styles } = StyleSheet.create({})
