import React, { useState, useEffect } from 'react'
import StyleSheet from 'react-native-media-query'
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { Avatar, Input, Overlay } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CometChat } from '@cometchat-pro/react-native-chat'

const ChatsListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([])

  useEffect(() => getChatList(), [])

  const getChatList = () => {
    const limit = 30
    const usersRequest = new CometChat.UsersRequestBuilder()
      .setLimit(limit)
      .build()

    usersRequest
      .fetchNext()
      .then((userList) => setUsers(userList))
      .catch((error) => {
        console.log('User list fetching failed with error:', error)
      })
  }

  return (
    <SafeAreaView>
      <Header navigation={navigation} />
      <ScrollView style={styles.container} dataSet={{ media: ids.container }}>
        <Search />
        {users.map((user, index) => (
          <ListItem key={index} user={user} navigation={navigation} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const Header = ({ navigation }) => {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')

  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const addFriend = (email) => {
    console.log(email)
  }

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
            Messaging
          </Text>
        </View>

        <View style={styles.flexify}>
          <TouchableOpacity style={{ marginRight: 40 }}>
            <Icon name="ellipsis-v" size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleOverlay}>
            <Icon name="edit" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View
          style={[styles.flexify, { marginHorizontal: 5, marginTop: 10 }]}
          dataSet={{ media: ids.flexify }}
        >
          <Input
            placeholder="Add user by email..."
            leftIcon={<Icon name="user" size={18} color="gray" />}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={(text) => setEmail(text)}
            onSubmitEditing={() => addFriend(email)}
            value={email}
          />
        </View>
      </Overlay>
    </View>
  )
}

const Search = () => (
  <View
    style={[styles.flexify, { marginHorizontal: 5, marginTop: 10 }]}
    dataSet={{ media: ids.flexify }}
  >
    <Input
      placeholder="Search messages"
      leftIcon={<Icon name="search" size={24} color="gray" />}
      inputContainerStyle={{ borderBottomWidth: 0 }}
    />

    <Icon name="sort-alpha-down" size={24} color="gray" />
  </View>
)

const ListItem = ({ navigation, user }) => (
  <TouchableOpacity
    style={[styles.flexify, styles.bordered]}
    dataSet={{ media: ids.flexify }}
    onPress={() =>
      navigation.navigate('ChatScreen', {
        id: user.uid,
        name: user.name,
        avatar: user.avatar,
      })
    }
  >
    <View style={styles.flexify} dataSet={{ media: ids.flexify }}>
      <Avatar rounded source={{ uri: user.avatar }} />
      <View style={{ marginLeft: 10 }}>
        <Text h4 style={{ fontWeight: 600 }}>
          {user.name}
        </Text>
        {/* <Text>Nice to meet you too!</Text> */}
      </View>
    </View>

    {/* <Text>Nov 12</Text> */}
  </TouchableOpacity>
)

export default ChatsListScreen

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
