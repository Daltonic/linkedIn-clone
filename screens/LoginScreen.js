import React from 'react'
import StyleSheet from 'react-native-media-query'
import { SafeAreaView, View, Image, Platform, Alert } from 'react-native'
import { Button, CheckBox, Divider, Input, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { getAuth, signInWithEmailAndPassword } from '../firebase'

const loginFormSchema = Yup.object().shape({
  email: Yup.string().email().required('A email is required'),
  password: Yup.string()
    .required('A password is required')
    .min(6, 'Password needs to be at least 6 characters long'),
})

const LoginScreen = ({ navigation }) => {
  const auth = getAuth()
  const onLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('Firebase Login Successful')
    } catch (error) {
      Platform.OS != 'web' ? Alert.alert(error.message) : alert(error.message)
    }
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
          onPress={() => navigation.navigate('SignupScreen')}
          title="Join now"
          color="#016bb4"
          type="clear"
        />
      </View>

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => onLogin(values.email, values.password)}
        validationSchema={loginFormSchema}
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
              Sign in
            </Text>

            <View>
              <Input
                style={{ marginBottom: 15 }}
                containerStyle={{
                  paddingHorizontal: 0,
                }}
                errorStyle={{ color: 'red' }}
                errorMessage={values.email.length > 4 ? errors.email : ''}
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

              <CheckBox
                title="Remember me"
                checked={true}
                checkedColor="#008400"
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  marginHorizontal: 0,
                  padding: 0,
                }}
                style={{ marginVertical: 15 }}
              />

              <Button
                title="Forget Password?"
                color="#016bb4"
                type="clear"
                containerStyle={{ alignItems: 'flex-start' }}
                style={{ marginVertical: 10 }}
              />

              <Button
                title="Sign In"
                color="white"
                containerStyle={{ borderRadius: 20 }}
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
              title="Sign in with Google"
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
              title="Sign in with Apple"
              iconLeft
              type="outline"
              buttonStyle={{ borderColor: 'gray', borderRadius: 20 }}
              style={{ marginBottom: 10, color: 'gray' }}
              titleStyle={{ color: 'gray' }}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  )
}

export default LoginScreen

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
