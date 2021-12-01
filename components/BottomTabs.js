import React, { useState } from 'react'
import { Text, TouchableOpacity, View, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import StyleSheet from 'react-native-media-query'

const BottomTabs = () => {
  const [activeTab, setActiveTab] = useState('Home')

  return (
    <View style={styles.wrapper} dataSet={{ media: ids.wrapper }}>
      <View style={styles.container} dataSet={{ media: ids.container }}>
        <TouchableOpacity
          dataSet={{ media: ids.iconContainer }}
          style={[
            styles.iconContainer,
            activeTab === 'Home' ? styles.active : styles.inactive,
          ]}
        >
          <Icon name="home" size={24} color="gray" />
          <Text style={{ color: 'gray' }}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          dataSet={{ media: ids.iconContainer }}
          style={[
            styles.iconContainer,
            activeTab === 'Post' ? styles.active : styles.inactive,
          ]}
        >
          <Icon name="plus-square" size={24} color="gray" />
          <Text style={{ color: 'gray' }}>Post</Text>
        </TouchableOpacity>

        <TouchableOpacity
          dataSet={{ media: ids.iconContainer }}
          style={[
            styles.iconContainer,
            activeTab === 'Jobs' ? styles.active : styles.inactive,
          ]}
        >
          <Icon name="briefcase" size={24} color="gray" />
          <Text style={{ color: 'gray' }}>Jobs</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BottomTabs

const { ids, styles } = StyleSheet.create({
  wrapper: {
    shadowColor: '#171717',
    shadowOffsetWidth: 0,
    shadowOffsetHeight: 2,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    ...Platform.select({
      default: {
        position: 'sticky',
      },
    }),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
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
  iconContainer: {
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  active: {
    borderTopColor: 'black',
  },
  inactive: {
    borderTopColor: 'transparent',
  },
})
