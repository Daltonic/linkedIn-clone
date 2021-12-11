import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, ScrollView } from 'react-native'
import StyleSheet from 'react-native-media-query'
import Header from '../components/Header'
import Card from '../components/Card'
import BottomTabs from '../components/BottomTabs'
import {
  collectionGroup,
  getFirestore,
  getDocs,
  query,
  orderBy,
} from '../firebase'

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([])
  const db = getFirestore()

  const getPosts = async () => {
    const posts = query(
      collectionGroup(db, 'posts'),
      orderBy('timestamp', 'desc')
    )
    const snapshot = await getDocs(posts)

    setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  }

  useEffect(() => getPosts(), [navigation])

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: '#f3f2ef' }}>
      <StatusBar style="light" />
      <Header />
      <ScrollView
        style={[styles.container, { paddingTop: 30 }]}
        dataSet={{ media: ids.container }}
      >
        {posts.map((post, index) => (
          <Card post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  )
}

export default HomeScreen

const { ids, styles } = StyleSheet.create({
  container: {
    '@media (min-width: 990px)': {
      width: '50%',
      marginVertical: 0,
      marginHorizontal: 'auto',
      paddingVertical: 10,
    },
    '@media (min-width: 690px) and (max-width: 989px)': {
      width: '75%',
      marginVertical: 0,
      marginHorizontal: 'auto',
    },
  },
})
