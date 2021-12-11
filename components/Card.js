import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { Avatar, Button, Divider, Text } from 'react-native-elements'
import StyleSheet from 'react-native-media-query'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
  getAuth,
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from '../firebase'

const Card = ({ post }) => {
  const auth = getAuth()
  const db = getFirestore()

  const handleLike = async (post) => {
    const currentLikeStatus = !post.liked.includes(auth.currentUser.email)
    const likesRef = doc(db, `users/${post.email}/posts`, post.id)

    try {
      await updateDoc(likesRef, {
        liked: currentLikeStatus
          ? arrayUnion(auth.currentUser.email)
          : arrayRemove(auth.currentUser.email),
      })
      console.log('Document successfully updated!')
    } catch (error) {
      console.log('Error updating document: ', error)
    }
  }

  const timeAgo = (date) => {
    let seconds = Math.floor((new Date() - date) / 1000)
    let interval = seconds / 31536000

    if (interval > 1) {
      return Math.floor(interval) + 'yr'
    }
    interval = seconds / 2592000
    if (interval > 1) {
      return Math.floor(interval) + 'mo'
    }
    interval = seconds / 86400
    if (interval > 1) {
      return Math.floor(interval) + 'd'
    }
    interval = seconds / 3600
    if (interval > 1) {
      return Math.floor(interval) + 'h'
    }
    interval = seconds / 60
    if (interval > 1) {
      return Math.floor(interval) + 'm'
    }
    return Math.floor(seconds) + 's'
  }

  return (
    <View style={[styles.card]} dataSet={{ media: ids.card }}>
      <View style={[styles.shadowProp]} dataSet={{ media: ids.container }}>
        <View style={styles.container}>
          <TouchableOpacity>
            <Avatar rounded source={{ uri: post.pic }} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={{ fontWeight: 600 }}>{post.fullname}</Text>
            <Text style={styles.grayText} dataSet={{ media: ids.grayText }}>
              {post.profession}
            </Text>
            <Text style={styles.grayText} dataSet={{ media: ids.grayText }}>
              {timeAgo(post.timestamp.toDate())} .{' '}
              <Icon name="globe" size={14} color="gray" />{' '}
            </Text>
          </View>
          <TouchableOpacity>
            <Icon name="ellipsis-v" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text>
            {post.description.length > 300
              ? post.description.slice(0, 300) + '...'
              : post.description}
          </Text>
        </View>

        <Image
          source={{ uri: post.imgURL }}
          style={{ width: '100%', height: 400, resizeMode: 'cover' }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
        >
          <View style={styles.iconContainer}>
            <View style={[styles.iconWrapper, { backgroundColor: '#378fe9' }]}>
              <Icon name="thumbs-up" size={12} color="white" />
            </View>
            <View style={[styles.iconWrapper, { backgroundColor: '#5e9e43' }]}>
              <Icon name="heart" size={12} color="white" />
            </View>
            <View style={[styles.iconWrapper, { backgroundColor: '#ffcf40' }]}>
              <Icon name="lightbulb" size={12} color="white" />
            </View>
            <Text style={{ marginHorizontal: 5 }}>{post.liked.length}</Text>
          </View>

          <View>
            <Text style={{ color: 'gray' }}>
              {post.comments.length}
              {post.comments.length == 1 ? ' comment' : ' comments'}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 5, marginBottom: 10, alignItems: 'center' }}>
          <Divider style={{ width: '95%' }} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            type="clear"
            iconPosition="top"
            icon={
              <Icon
                name="thumbs-up"
                size={15}
                color={
                  post.liked.includes(auth.currentUser.email)
                    ? '#378fe9'
                    : 'gray'
                }
              />
            }
            titleStyle={{
              color: post.liked.includes(auth.currentUser.email)
                ? '#378fe9'
                : 'gray',
            }}
            containerStyle={{ flex: 1 }}
            title="Like"
            onPress={() => handleLike(post)}
          />
          <Button
            type="clear"
            iconPosition="top"
            icon={<Icon name="comment-dots" size={15} color="gray" />}
            titleStyle={{ color: 'gray' }}
            containerStyle={{ flex: 1 }}
            title="Comment"
          />
          <Button
            type="clear"
            iconPosition="top"
            icon={<Icon name="share" size={15} color="gray" />}
            titleStyle={{ color: 'gray' }}
            containerStyle={{ flex: 1 }}
            title="Share"
          />
          <Button
            type="clear"
            iconPosition="top"
            icon={<Icon name="paper-plane" size={15} color="gray" />}
            titleStyle={{ color: 'gray' }}
            containerStyle={{ flex: 1 }}
            title="Send"
          />
        </View>
      </View>
    </View>
  )
}

export default Card

const { ids, styles } = StyleSheet.create({
  card: {
    paddingBottom: 20,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerCenter: {
    flex: 1,
    marginRight: 20,
    marginLeft: 10,
  },
  grayText: {
    color: 'gray',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: 'gray',
    width: 23,
    height: 23,
    textAlign: 'center',
    marginVertical: 5,
    marginHorizontal: 2.5,
  },
})
