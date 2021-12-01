import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { Avatar, Button, Divider, Text } from 'react-native-elements'
import StyleSheet from 'react-native-media-query'
import Icon from 'react-native-vector-icons/FontAwesome5'

const Card = () => {
  return (
    <View style={[styles.card]} dataSet={{ media: ids.card }}>
      <View style={[styles.shadowProp]} dataSet={{ media: ids.container }}>
        <View style={styles.container}>
          <TouchableOpacity>
            <Avatar rounded source={require('../assets/avatar.jpg')} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={{ fontWeight: 600 }}>Darlington Gospel</Text>
            <Text style={styles.grayText} dataSet={{ media: ids.grayText }}>
              Sr. Software Engineer - IOS at CometChat
            </Text>
            <Text style={styles.grayText} dataSet={{ media: ids.grayText }}>
              8d . <Icon name="globe" size={14} color="gray" />{' '}
            </Text>
          </View>
          <TouchableOpacity>
            <Icon name="ellipsis-v" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text>
            I'm not so happy to share this message with you, being that it isn't
            even real, its just me trying to make a lengthy text...
          </Text>
        </View>

        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2021/11/13/23/06/tree-6792528_960_720.jpg',
          }}
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
            <Text style={{ marginHorizontal: 5 }}>5</Text>
          </View>

          <View>
            <Text style={{ color: 'gray' }}>9 comments</Text>
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
            icon={<Icon name="thumbs-up" size={15} color="gray" />}
            titleStyle={{ color: 'gray' }}
            containerStyle={{ flex: 1 }}
            title="Like"
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
    paddingVertical: 45,
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
