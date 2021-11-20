import React from 'react'
import StyleSheet from 'react-native-media-query'
import { View, Image } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'

const LoginScreen = () => {
  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <View style={styles.header} dataSet={{ media: ids.header }}>
        <Image
          style={styles.logo}
          dataSet={{ media: ids.logo }}
          source={require('../assets/logo.png')}
        />
        <Button title="Join now" color="#0073b0" type="clear" />
      </View>

      <View style={styles.formContainer} dataSet={{ media: ids.formContainer }}>
        <View style={{ marginTop: 40 }}>
          <Text h2 style={{ fontWeight: 'bold' }}>
            Sign in
          </Text>
        </View>

        <View>
          <Input placeholder="Email or Phone" />

          <Input
            placeholder="Password"
            secureTextEntry={true}
            rightIcon={{ type: 'font-awesome', name: 'eye' }}
          />

          <Button title="Continue" background="#0073b0" color="white" />
        </View>
      </View>
    </View>
  )
}

export default LoginScreen

const { ids, styles } = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 50,
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
    alignItems: 'center',
    '@media (min-width: 990px)': {
      width: '50%',
    },
  },
})
