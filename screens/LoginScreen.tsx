import { StyleSheet, SafeAreaView, View, Image, KeyboardAvoidingView, Text, TextInput, Button, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';
import { login } from '@/api/userAPI';
import Loader from '@/components/Loader';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '@/context/userContext';
import { jwtDecode } from 'jwt-decode';
const iconImage = require('@/assets/images/icon.png');

// Define form data
interface Login {
    email: string;
    password: string;
}

interface MyJWTPayload {
    userId: string;
    email: string;
}

const LoginScreen = () => {

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<Login>({
    })
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<any>();
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");

                if (token) {
                    const decodedToken = jwtDecode<MyJWTPayload>(token);
                    setUser({
                        id: decodedToken.userId,
                        email: decodedToken.email
                    })
                    navigation.replace("Main");
                }
            } catch (err) {
                console.log("error message", err);
            }
        };
        checkLoginStatus();
    }, []);

    const onSubmit: SubmitHandler<Login> = async (user) => {
        setIsLoading(true);
        const data = await login(user);
        debugger
        if (data && data.success) {
            console.log(data)
            debugger
            const token = data.token;
            await AsyncStorage.setItem("authToken", token);
            const decodedToken = jwtDecode<MyJWTPayload>(token);
            setUser({
                id: decodedToken.userId,
                email: decodedToken.email
            })
            console.log(user, ">>>>>>>>>");
            reset();
            setIsLoading(false);
            navigation.replace("Main");
            Toast.show({
                type: "success",
                text1: "Login Successfuly!",
                text2: "You are Successfuly Logged into your Account.",
                position: "top",
                visibilityTime: 3000,
                autoHide: true,
            });
        } else {
            setIsLoading(false);
            Toast.show({
                type: "error",
                text1: "Login Failed!",
                text2: data.message || "Please try again after some time.",
                position: "top",
                visibilityTime: 3000,
                autoHide: true,
            });
        }
    }


    return (
        <SafeAreaView style={styles.loginContainer} >
            {isLoading && <Loader />}
            <View>
                <Image style={styles.imageContainer} source={iconImage} />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.loginText}>Login In to your Account</Text>
                </View>

                <View style={{ paddingTop: 90 }}>
                    <View style={styles.inputContainer}>
                        <MaterialIcons style={styles.icon} name="email" size={24} />
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholder='Enter Your Email'
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

                <View style={{ paddingTop: 10 }}>
                    <View style={styles.inputContainer}>
                        <AntDesign style={styles.icon} name="lock1" size={24} />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    style={styles.inputStyle}
                                    secureTextEntry={true}
                                    placeholder='Enter Your Password'
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
                    {errors.password?.message && <Text style={styles.errorText}>{errors.password.message}</Text>}
                </View>

                <View style={styles.adtionalOption}>
                    <Text>Keep me Logged In</Text>
                    <Text style={{ color: "#007FFF", fontWeight: 500 }}>Forgot Password?</Text>
                </View>

                <View style={{ paddingTop: 50 }}>
                    <Button color={'black'} title='Login' onPress={handleSubmit(onSubmit)} />
                </View>

                <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 15 }}>
                    <Text style={{ fontSize: 17, textAlign: 'center', color: 'gray' }}>Don't have an acount? Sign Up</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

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
    }
})