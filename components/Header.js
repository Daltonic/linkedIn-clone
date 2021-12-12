import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import StyleSheet from 'react-native-media-query'
import { Avatar, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getAuth, signOut } from '../firebase'

const Header = ({ navigation }) => {
  const auth = getAuth()
  const PLACEHOLDER_AVATAR =
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'

  const signOutUser = async () => {
    try {
      await signOut(auth)
      console.log('Signed out successfully')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.headerWrapper} dataSet={{ media: ids.headerWrapper }}>
      <View style={styles.container} dataSet={{ media: ids.container }}>
        <View style={styles.headerLeft} dataSet={{ media: ids.headerLeft }}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL || PLACEHOLDER_AVATAR,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter} dataSet={{ media: ids.headerCenter }}>
          <Input
            placeholder="Search"
            leftIcon={<Icon name="search" size={24} color="gray" />}
            rightIcon={<Icon name="qrcode" size={24} color="gray" />}
            containerStyle={{ borderRadius: 7, backgroundColor: '#eff2f7' }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            errorStyle={{ margin: 0 }}
          />
        </View>
        <View style={styles.headerRight} dataSet={{ media: ids.headerRight }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatsListScreen')}
            activeOpacity={0.5}
          >
            <Icon name="commenting" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Header

const { ids, styles } = StyleSheet.create({
  headerWrapper: {
    shadowColor: '#171717',
    shadowOffsetWidth: 0,
    shadowOffsetHeight: 2,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerLeft: {
    marginRight: 20,
  },
  headerCenter: {
    flex: 1,
  },
  headerRight: {
    marginLeft: 20,
  },
})
