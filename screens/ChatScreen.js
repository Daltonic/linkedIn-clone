import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Avatar, Input } from 'react-native-elements'
import StyleSheet from 'react-native-media-query'
import Icon from 'react-native-vector-icons/FontAwesome5'

const ChatScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ height: '100%' }}>
      <Header navigation={navigation} />
      <ScrollView
        style={([styles.container], { paddingVertical: 20 })}
        dataSet={{ media: ids.container }}
      >
        {Array(4)
          .join(Math.random())
          .split('.')
          .map((n, index) => (
            <Message key={index + n} />
          ))}
      </ScrollView>
      <BottomInput />
    </SafeAreaView>
  )
}

const Header = ({ navigation }) => {
  return (
    <View style={styles.headerWrapper} dataSet={{ media: ids.headerWrapper }}>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
        dataSet={{ media: ids.container }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="long-arrow-alt-left" size={24} color="gray" />
          </TouchableOpacity>

          <Text style={{ fontWeight: 500, marginLeft: 20 }} h4>
            Priyanka Gurnani
          </Text>
        </View>

        <View style={styles.flexify}>
          <TouchableOpacity style={{ marginRight: 40 }}>
            <Icon name="ellipsis-v" size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Icon name="video" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const Message = () => (
  <View
    style={[styles.flexify, { justifyContent: 'flex-start', marginBottom: 10 }]}
  >
    <Avatar rounded source={require('../assets/avatar.jpg')} />
    <View style={{ marginLeft: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text h4 style={{ fontWeight: 500 }}>
          Priyanka Gurnani
        </Text>
        <Text style={{ marginLeft: 5, fontSize: 10, color: 'gray' }}>
          8:59 AM
        </Text>
      </View>
      <Text>Only you understand</Text>
    </View>
  </View>
)

const BottomInput = () => (
  <View style={styles.headerWrapper} dataSet={{ media: ids.headerWrapper }}>
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity>
          <Icon name="plus" size={24} color="blue" />
        </TouchableOpacity>
        <Input
          placeholder="Write a message..."
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />

        <TouchableOpacity>
          <Icon name="microphone" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
)

export default ChatScreen

const { ids, styles } = StyleSheet.create({
  headerWrapper: {
    shadowColor: '#171717',
    shadowOffsetWidth: 0,
    shadowOffsetHeight: 2,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 20,
    height: '100%',
    '@media (min-width: 990px)': {
      width: '50%',
      marginVertical: 0,
      marginHorizontal: 'auto',
    },
    '@media (min-width: 690px) and (max-width: 989px)': {
      width: '75%',
      marginVertical: 0,
      marginHorizontal: 'auto',
    },
  },
  flexify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bordered: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    paddingVertical: 10,
  },
})
