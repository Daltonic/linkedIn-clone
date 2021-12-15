import { CometChat } from '@cometchat-pro/react-native-chat'
import React, { useEffect, useRef, useState } from 'react'
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
import { getAuth } from '../firebase'
import InvertibleScrollView from 'react-native-invertible-scroll-view'
import { vh } from 'react-native-expo-viewport-units'

const auth = getAuth()

const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const scrollViewRef = useRef()

  useEffect(() => {
    getMessages()
    listenForMessage()
  }, [route])

  const getMessages = () => {
    let UID = route.params.id
    let limit = 30
    let messagesRequest = new CometChat.MessagesRequestBuilder()
      .setUID(UID)
      .setLimit(limit)
      .build()

    messagesRequest.fetchPrevious().then(
      (messages) => setMessages(messages),
      (error) => {
        console.log('Message fetching failed with error:', error)
      }
    )
  }

  const sendMessage = () => {
    let receiverID = route.params.id
    let messageText = message
    let receiverType = CometChat.RECEIVER_TYPE.USER
    let textMessage = new CometChat.TextMessage(
      receiverID,
      messageText,
      receiverType
    )

    CometChat.sendMessage(textMessage).then(
      (message) => {
        setMessages((prevState) => [...prevState, message])
        setMessage('')
        console.log('Message sent successfully:', message)
      },
      (error) => {
        console.log('Message sending failed with error:', error)
      }
    )
  }

  const listenForMessage = () => {
    const listenerID = Math.random().toString(16).slice(2)
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (message) => {
          setMessages((prevState) => [...prevState, message])
        },
      })
    )
  }

  return (
    <SafeAreaView style={{ position: 'relative' }}>
      <Header navigation={navigation} route={route} />
      <InvertibleScrollView
        ref={scrollViewRef}
        onContentSizeChange={(width, height) =>
          scrollViewRef.current.scrollTo({ y: height })
        }
        style={([styles.container], { paddingVertical: 20, height: vh(90) })}
        dataSet={{ media: ids.container }}
      >
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message}
            iAmSender={auth.currentUser.uid == message.receiverID}
            isLastMessage={messages.at(-1) == message}
          />
        ))}
      </InvertibleScrollView>
      {/* Bottom Input */}
      <View
        style={[
          styles.headerWrapper,
          { position: 'absolute', bottom: 0, left: 0, right: 0 },
        ]}
        dataSet={{ media: ids.headerWrapper }}
      >
        <View style={styles.container} dataSet={{ media: ids.container }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={[styles.shadow, { padding: 10, borderRadius: 50 }]}
            >
              <Icon name="plus" size={24} color="blue" />
            </TouchableOpacity>

            <Input
              placeholder="Write a message..."
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={{
                backgroundColor: '#dedede',
                marginHorizontal: 15,
              }}
              onSubmitEditing={() => sendMessage()}
              onChangeText={(text) => setMessage(text)}
              value={message}
            />

            <TouchableOpacity style={{ padding: 10, borderRadius: 50 }}>
              <Icon name="microphone" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const Header = ({ navigation, route }) => {
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

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20,
            }}
          >
            <Avatar rounded source={{ uri: route.params.avatar }} />
            <Text style={{ fontWeight: 500, marginLeft: 5 }} h4>
              {route.params.name}
            </Text>
          </View>
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

const Message = ({ message, iAmSender, isLastMessage }) => {
  const dateToTime = (date) => {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0' + minutes : minutes
    let strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
  }

  return (
    <View
      style={[
        styles.flexify,
        { justifyContent: 'flex-start' },
        isLastMessage ? { marginBottom: 70 } : { marginBottom: 10 },
      ]}
    >
      <Avatar
        rounded
        source={{
          uri: iAmSender ? message.receiver?.avatar : message.sender?.avatar,
        }}
      />
      <View style={{ marginLeft: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text h4 style={{ fontWeight: 500 }}>
            {iAmSender ? message.receiver?.name : message.sender?.name}
          </Text>
          <Text style={{ marginLeft: 5, fontSize: 10, color: 'gray' }}>
            {dateToTime(new Date(message.sentAt * 1000))}
          </Text>
        </View>
        <Text>{message.text}</Text>
      </View>
    </View>
  )
}

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
  shadow: {
    shadowColor: '#171717',
    shadowOffsetWidth: 0,
    shadowOffsetHeight: 2,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 50,
  },
})
