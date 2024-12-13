import { StyleSheet, SafeAreaView, View, Image, KeyboardAvoidingView, Text, TextInput, Button, Pressable } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';

const iconImage = require('@/assets/images/icon.png');

// Define form data
interface Register {
  name: string;
  email: string;
  password: string;
}

const RegisterScreen = () => {

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<Register>({
  })

  const navaigation = useNavigation<any>();

  const onSubmit: SubmitHandler<Register> = (data) => console.log(data);
  // const onSubmit = (data:Register) => console.log(data)


  return (
    <SafeAreaView style={styles.loginContainer} >
      <View>
        <Image style={styles.imageContainer} source={iconImage} />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.loginText}>Register to your Account</Text>
        </View>

        <View style={{ paddingTop: 50 }}>
          <View style={styles.inputContainer}>
            <Ionicons style={styles.icon} name="person" size={24} />
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.inputStyle}
                  placeholder='enter your Name'
                  value={value}
                  onChangeText={value => onChange(value)}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: '*Name is required!'
                }
              }}
            />
          </View>
          {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
        </View>

        <View style={{ paddingTop: 5 }}>
          <View style={styles.inputContainer}>
            <MaterialIcons style={styles.icon} name="email" size={24} />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.inputStyle}
                  placeholder='enter your Email'
                  value={value}
                  onChangeText={value => onChange(value)}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: '*Email is required!'
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: '*Please enter a valid email address',
                },
              }}
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        </View>

        <View style={{ paddingTop: 5 }}>
          <View style={styles.inputContainer}>
            <AntDesign style={styles.icon} name="lock1" size={24} />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.inputStyle}
                  secureTextEntry={true}
                  placeholder='enter your Password'
                  value={value}
                  onChangeText={value => onChange(value)}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: '*Password is required!'
                }
              }}
            />
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        </View>

        <View style={styles.adtionalOption}>
          <Text>Keep me Logged In</Text>
          <Text style={{ color: "#007FFF", fontWeight: 500 }}>Forgot Password?</Text>
        </View>

        <View style={{ paddingTop: 50 }}>
          <Button color={'black'} title='Register' onPress={handleSubmit(onSubmit)} />
        </View>
        
        <Pressable onPress={() => navaigation.navigate("Login")} style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 17, textAlign: 'center', color: 'gray' }}>Already have an acount? Sign In</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  imageContainer: {
    width: 200,
    height: 100,
    marginRight: 22
  },
  loginText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "grey",
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#D0D0D0',
    borderRadius: 5,
    alignItems: 'center',
    gap: 5,
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 30,
    marginVertical: 8
  },
  inputStyle: {
    width: 300,
    // marginVertical: 8,
    fontSize: 16
  },
  icon: {
    paddingLeft: 8,
    color: 'gray'
  },
  adtionalOption: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonStyle: {
    color: 'white',
    fontWeight: "bold",
    backgroundColor: "black"
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
})