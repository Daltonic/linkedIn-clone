import React from 'react'
import StyleSheet from 'react-native-media-query'
import {
  SafeAreaView,
  View,
  Image,
  ScrollView,
  Platform,
  Alert,
} from 'react-native'
import { Button, Divider, Input, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  getAuth,
  createUserWithEmailAndPassword,
  getFirestore,
  setDoc,
  doc,
  updateProfile,
} from '../firebase'
import { CometChat } from '@cometchat-pro/react-native-chat'
import { CONSTANTS } from '../CONSTANTS'

const signupFormSchema = Yup.object().shape({
  email: Yup.string().email().required('A email is required.'),
  fullname: Yup.string()
    .required('A fullname is required.')
    .min(3, 'fullname needs to be at least 3 characters long.'),
  profession: Yup.string()
    .required('A profession is required.')
    .min(5, 'Profession needs to be at least 5 characters long.')
    .max(20, 'Profession exceeded 20 characters.'),
  imgURL: Yup.string()
    .matches(
      /(http(s?):\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.gif|.jpeg)(\?[^\s[",><]*)?/g,
      'Enter a correct image URL'
    )
    .required('An image URL is required'),
  password: Yup.string()
    .required('A password is required.')
    .min(6, 'Password needs to be at least 6 characters long.'),
})

const SignupScreen = ({ navigation }) => {
  const auth = getAuth()
  const db = getFirestore()

  const onSignup = async (email, password, fullname, profession, imgURL) => {
    try {
      const authed = await createUserWithEmailAndPassword(auth, email, password)
      const userDocRef = doc(db, 'users', authed.user.email)

      await setDoc(userDocRef, {
        fullname,
        email,
        profession,
        pic: imgURL,
        uid: authed.user.uid,
      }).then(() => {
        signInWithCometChat(authed.user.uid, fullname, imgURL)
        updateUserProfile(authed.user, fullname, imgURL)
        console.log('Firebase Signed Up Successful...')
      })
    } catch (error) {
      Platform.OS != 'web' ? Alert.alert(error.message) : alert(error.message)
    }
  }

  const updateUserProfile = (user, displayName, photoURL) => {
    updateProfile(user, {
      displayName,
      photoURL,
    })
      .then(() => console.log('Profile Updated!'))
      .catch((error) => console.log(error.message))
  }

  const signInWithCometChat = (UID, name, avatar) => {
    let authKey = CONSTANTS.Auth_Key

    let user = new CometChat.User(UID)

    user.setName(name)
    user.setAvatar(avatar)

    CometChat.createUser(user, authKey).then(
      (user) => {
        console.log('user created', user)
        loginWithCometChat(UID)
      },
      (error) => {
        console.log('error', error)
      }
    )
  }

  const loginWithCometChat = (UID) => {
    const authKey = CONSTANTS.Auth_Key
    CometChat.login(UID, authKey).then(
      (user) => {
        console.log('Login Successful:', { user })
      },
      (error) => {
        console.log('Login failed with exception:', { error })
      }
    )
  }

  return (
    <SafeAreaView style={styles.container} dataSet={{ media: ids.container }}>
      <View style={styles.header} dataSet={{ media: ids.header }}>
        <Image
          style={styles.logo}
          dataSet={{ media: ids.logo }}
          source={require('../assets/logo.png')}
        />
        <Button
          onPress={() => navigation.navigate('LoginScreen')}
          title="Login"
          color="#016bb4"
          type="clear"
        />
      </View>
      <ScrollView>
        <Formik
          initialValues={{
            email: '',
            password: '',
            fullname: '',
            profession: '',
            imgURL: '',
          }}
          onSubmit={(values) =>
            onSignup(
              values.email,
              values.password,
              values.fullname,
              values.profession,
              values.imgURL
            )
          }
          validationSchema={signupFormSchema}
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
            <View
              style={styles.formContainer}
              dataSet={{ media: ids.formContainer }}
            >
              <Text
                h2
                style={{ fontWeight: 500, marginTop: 40, marginBottom: 10 }}
              >
                Sign up
              </Text>

              <View>
                <Input
                  style={{ marginBottom: 15 }}
                  containerStyle={{
                    paddingHorizontal: 0,
                  }}
                  errorStyle={{ color: 'red' }}
                  errorMessage={values.email.length >= 4 ? errors.email : ''}
                  placeholder="Email or Phone"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />

                <Input
                  style={{ marginBottom: 15 }}
                  containerStyle={{
                    paddingHorizontal: 0,
                  }}
                  errorStyle={{ color: 'red' }}
                  errorMessage={
                    values.fullname.length >= 2 ? errors.fullname : ''
                  }
                  placeholder="fullname"
                  autoCapitalize="none"
                  textContentType="fullname"
                  onChangeText={handleChange('fullname')}
                  onBlur={handleBlur('fullname')}
                  value={values.fullname}
                />

                <Input
                  style={{ marginBottom: 15 }}
                  containerStyle={{
                    paddingHorizontal: 0,
                  }}
                  errorStyle={{ color: 'red' }}
                  errorMessage={
                    values.profession.length >= 3 ? errors.profession : ''
                  }
                  placeholder="Profession"
                  autoCapitalize="none"
                  textContentType="profession"
                  onChangeText={handleChange('profession')}
                  onBlur={handleBlur('profession')}
                  value={values.profession}
                />

                <Input
                  style={{ marginBottom: 15 }}
                  containerStyle={{
                    paddingHorizontal: 0,
                  }}
                  errorStyle={{ color: 'red' }}
                  errorMessage={values.imgURL.length >= 1 ? errors.imgURL : ''}
                  placeholder="Image URL"
                  autoCapitalize="none"
                  textContentType="imgURL"
                  onChangeText={handleChange('imgURL')}
                  onBlur={handleBlur('imgURL')}
                  value={values.imgURL}
                />

                <Input
                  style={{ marginBottom: 15 }}
                  containerStyle={{
                    paddingHorizontal: 0,
                  }}
                  errorStyle={{ color: 'red' }}
                  errorMessage={
                    values.password.length >= 3 ? errors.password : ''
                  }
                  rightIcon={<Icon name="eye" size={15} color="gray" />}
                  placeholder="Password"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  textContentType="password"
                  autoCorrect={false}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />

                <Button
                  title="Sign Up"
                  color="white"
                  containerStyle={{ borderRadius: 20, marginTop: 10 }}
                  buttonStyle={{ backgroundColor: '#016bb4' }}
                  onPress={handleSubmit}
                  disabled={!isValid}
                />
              </View>

              <Divider
                width={1}
                orientation="horizontal"
                style={{
                  marginVertical: 30,
                  borderColor: '#e7e7e9',
                  position: 'relative',
                }}
              />

              <Button
                icon={
                  <Icon
                    name="google"
                    size={15}
                    color="black"
                    style={{ marginRight: 10 }}
                  />
                }
                title="Sign up with Google"
                iconLeft
                type="outline"
                buttonStyle={{ borderColor: 'gray', borderRadius: 20 }}
                style={{ marginBottom: 10, color: 'gray' }}
                titleStyle={{ color: 'gray' }}
              />

              <Button
                icon={
                  <Icon
                    name="apple"
                    size={15}
                    color="black"
                    style={{ marginRight: 10 }}
                  />
                }
                title="Sign up with Apple"
                iconLeft
                type="outline"
                buttonStyle={{ borderColor: 'gray', borderRadius: 20 }}
                style={{ marginBottom: 20, color: 'gray' }}
                titleStyle={{ color: 'gray' }}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignupScreen

const { ids, styles } = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    resizeMode: 'contain',
  },
  formContainer: {
    justifyContent: 'center',
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
})
