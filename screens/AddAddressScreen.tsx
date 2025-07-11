import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from 'expo-router'
import { UserContext } from '@/context/userContext'
import { getAddresses } from '@/api/userAPI'

const AddAddressScreen = () => {

    const navigation = useNavigation<any>();
    const { user } = useContext(UserContext);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        fetchAddresses();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchAddresses();
        }, [])
    );

    const fetchAddresses = async () => {
        try {
            const data = await getAddresses(user.id)
            if (data && data.success) setAddresses(data.data)
        } catch (error) {
            console.log("error", error);
        }
    }

    console.log(addresses, "address");

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ backgroundColor: 'black', padding: 10 }}>
                <Pressable
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        gap: 10,
                        borderRadius: 3,
                        height: 38,
                        marginHorizontal: 7
                    }}
                >
                    <Ionicons style={{ paddingLeft: 10 }} name="search" size={22} color="black" />
                    <TextInput style={{ flex: 1 }} placeholder='Please Search here for Items' />
                </Pressable>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>

                <Pressable
                    onPress={() => navigation.navigate("AddAddress")}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 10,
                        borderColor: "#D0D0D0",
                        borderWidth: 1,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        paddingVertical: 7,
                        paddingHorizontal: 5,
                    }}
                >
                    <Text>Add a new Address</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </Pressable>

                <Pressable>
                    {addresses?.map((item: any, index) => (
                        <Pressable
                            style={{
                                borderWidth: 1,
                                borderColor: "#D0D0D0",
                                padding: 10,
                                flexDirection: "column",
                                gap: 5,
                                marginVertical: 10,
                            }}
                        >
                            <View
                                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                            >
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                                    {item?.name}
                                </Text>
                                <Entypo name="location-pin" size={24} color="red" />
                            </View>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                {item?.houseNo}, {item?.landmark}
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                {item?.street}
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                {item?.country}, {item?.city}
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                phone No : {item?.mobileNo}
                            </Text>
                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                pin code : {item?.postalCode}
                            </Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10,
                                    marginTop: 7,
                                }}
                            >
                                <Pressable
                                    style={{
                                        backgroundColor: "#F5F5F5",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 0.9,
                                        borderColor: "#D0D0D0",
                                    }}
                                >
                                    <Text>Edit</Text>
                                </Pressable>

                                <Pressable
                                    style={{
                                        backgroundColor: "#F5F5F5",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 0.9,
                                        borderColor: "#D0D0D0",
                                    }}
                                >
                                    <Text>Remove</Text>
                                </Pressable>

                                <Pressable
                                    style={{
                                        backgroundColor: "#F5F5F5",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 0.9,
                                        borderColor: "#D0D0D0",
                                    }}
                                >
                                    <Text>Set as Default</Text>
                                </Pressable>
                            </View>
                        </Pressable>
                    ))}
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default AddAddressScreen

const styles = StyleSheet.create({})