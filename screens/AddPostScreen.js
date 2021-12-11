import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, SafeAreaView } from 'react-native'
import { Text, Button, Avatar, Input } from 'react-native-elements'
import StyleSheet from 'react-native-media-query'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  getAuth,
  collection,
  addDoc,
  getDoc,
  doc,
  getFirestore,
  serverTimestamp,
} from '../firebase'

const addPostFormSchema = Yup.object().shape({
  title: Yup.string()
    .required('A post title is required')
    .min(6, 'Post title needs to be at least 6 characters long'),
  imgURL: Yup.string()
    .matches(
      /(http(s?):\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.gif)(\?[^\s[",><]*)?/g,
      'Enter a correct image URL'
    )
    .required('An image URL is required'),
  description: Yup.string()
    .required('A post description is required')
    .min(10, 'Post description needs to be at least 10 characters long'),
})

const AddPostScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null)

  const auth = getAuth()
  const db = getFirestore()

  useEffect(() => getProfile(), [])

  const getProfile = async () => {
    const userDocRef = doc(db, `users/${auth.currentUser.email}`)
    const docSnap = await getDoc(userDocRef)
    const data = docSnap.data()

    setProfile({
      fullname: data.fullname,
      pic: data.pic,
      uid: data.uid,
      email: data.email,
    })
  }

  const addPost = async (title, imgURL, description) => {
    try {
      await addDoc(collection(db, `users/${profile.email}`, 'posts'), {
        timestamp: serverTimestamp(),
        fullname: profile.fullname,
        pic: profile.pic,
        uid: profile.uid,
        email: profile.email,
        title,
        description,
        imgURL,
        liked: [],
        comments: [],
      })

      navigation.goBack()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <SafeAreaView>
      <Header navigation={navigation} />
      <View style={styles.container} dataSet={{ media: ids.container }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}
        >
          <Avatar rounded source={require('../assets/avatar.jpg')} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: 500 }}>Darlington Gospel</Text>
            <Button
              icon={
                <Icon
                  name="caret-down"
                  size={24}
                  color="gray"
                  style={{ marginLeft: 5 }}
                />
              }
              iconRight
              title="Anyone"
              type="outline"
              buttonStyle={{
                borderColor: 'gray',
                borderRadius: 20,
                padding: 0,
              }}
              titleStyle={{ color: 'black', fontWeight: 700, fontSize: 14 }}
            />
          </View>
        </View>

        <Formik
          initialValues={{
            title: '',
            imgURL: '',
            description: '',
          }}
          onSubmit={(values) => {
            addPost(values.title, values.imgURL, values.description)
          }}
          validationSchema={addPostFormSchema}
          validateOnMount={true}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <View>
              <Input
                placeholder="Post Title*"
                errorStyle={{ color: 'red' }}
                errorMessage={values.title.length >= 4 ? errors.title : ''}
                autoCapitalize="none"
                keyboardType="title"
                textContentType="titlePost"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />

              <Input
                placeholder="Post Image URL*"
                errorStyle={{ color: 'red' }}
                errorMessage={values.imgURL.length >= 4 ? errors.imgURL : ''}
                autoCapitalize="none"
                keyboardType="imgURL"
                textContentType="imgURLPost"
                onChangeText={handleChange('imgURL')}
                onBlur={handleBlur('imgURL')}
                value={values.imgURL}
              />

              <Input
                placeholder="Share an article, photo, video, or an idea*"
                multiline={true}
                numberOfLines={4}
                errorStyle={{ color: 'red' }}
                errorMessage={
                  values.description.length >= 4 ? errors.description : ''
                }
                autoCapitalize="none"
                keyboardType="description"
                textContentType="descriptionPost"
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                inputContainerStyle={{ borderBottomWidth: 0 }}
              />

              <Button
                title="Post"
                color="white"
                containerStyle={{ borderRadius: 20, marginTop: 10 }}
                buttonStyle={{ backgroundColor: '#016bb4' }}
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </View>
          )}
        </Formik>

        <View style={{ height: '25%' }}></View>

        <Footer />
      </View>
    </SafeAreaView>
  )
}

const Header = ({ navigation }) => (
  <View style={styles.headerWrapper} dataSet={{ media: ids.headerWrapper }}>
    <View
      style={
        (styles.container,
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        })
      }
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
          <Icon name="times" size={24} color="gray" />
        </TouchableOpacity>

        <Text style={{ fontWeight: 500, marginLeft: 20, fontSize: 16 }}>
          Share post
        </Text>
      </View>

      <TouchableOpacity>
        <Button title="Post" type="clear" titleStyle={{ color: 'gray' }} />
      </TouchableOpacity>
    </View>
  </View>
)

const Footer = () => (
  <>
    <Text style={{ color: '#016bb4', fontWeight: 600 }}>Add hashtag</Text>

    <View style={[styles.flexify, { marginTop: 10 }]}>
      <View style={styles.flexify}>
        <Icon
          style={{ marginRight: 20 }}
          name="camera"
          size={24}
          color="gray"
        />
        <Icon style={{ marginRight: 20 }} name="video" size={24} color="gray" />
        <Icon style={{ marginRight: 20 }} name="image" size={24} color="gray" />
        <Icon
          style={{ marginRight: 20 }}
          name="ellipsis-h"
          size={24}
          color="gray"
        />
      </View>

      <View style={styles.flexify}>
        <Icon
          style={{ marginRight: 10 }}
          name="comment"
          size={24}
          color="gray"
        />
        <Text>Anyone</Text>
      </View>
    </View>
  </>
)

export default AddPostScreen

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
})
