import React from 'react'
import StyleSheet from 'react-native-media-query'
import { View, Image } from 'react-native'
import { Button, CheckBox, Divider, Input, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

const LoginScreen = () => {
  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <View style={styles.header} dataSet={{ media: ids.header }}>
        <Image
          style={styles.logo}
          dataSet={{ media: ids.logo }}
          source={require('../assets/logo.png')}
        />
        <Button title="Join now" color="#016bb4" type="clear" />
      </View>

      <View style={styles.formContainer} dataSet={{ media: ids.formContainer }}>
        <Text h2 style={{ fontWeight: 500, marginTop: 40, marginBottom: 10 }}>
          Sign in
        </Text>

        <View>
          <Input
            style={{ marginBottom: 15 }}
            containerStyle={{ paddingHorizontal: 0 }}
            placeholder="Email or Phone"
          />

          <Input
            style={{ marginBottom: 15 }}
            containerStyle={{ paddingHorizontal: 0 }}
            placeholder="Password"
            secureTextEntry={true}
            rightIcon={<Icon name="eye" size={15} color="gray" />}
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
            style={{marginVertical: 15}}
          />

          <Button
            title="Forget Password?"
            color="#016bb4"
            type="clear"
            containerStyle={{ alignItems: 'flex-start' }}
            style={{marginVertical: 10}}
          />

          <Button
            title="Continue"
            color="white"
            containerStyle={{ borderRadius: 20 }}
            buttonStyle={{backgroundColor: '#016bb4'}}
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
    </View>
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
      width: '60%',
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
