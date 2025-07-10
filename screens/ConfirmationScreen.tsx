import { View, Text, Button, ScrollView, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Stepper from '@/components/Stepper';
import { getAddresses, placeOrder } from '@/api/userAPI';
import { UserContext } from '@/context/userContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { cleanCart } from '@/slices/CartSlice';
import { useNavigation } from 'expo-router';
import Toast from 'react-native-toast-message';

const ConfirmationScreen = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const steps = [
        { title: "Address", content: "Address Form" },
        { title: "Delivery", content: "Delivery Options" },
        { title: "Payment", content: "Payment Details" },
        { title: "Place Order", content: "Order Summary" },
    ];
    const { user } = useContext(UserContext);
    const cart = useSelector((state: RootState) => state.cart.cart)
    const dispatch = useDispatch();
    const total = cart
        ?.map((item: any) => item.price * item.quantity)
        .reduce((curr, prev) => curr + prev, 0);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAdress] = useState<any>(null);
    const [deliveryOption, setDeliveryOption] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const navigation = useNavigation<any>();


    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const data = await getAddresses(user.id)
            if (data && data.success) setAddresses(data.data)
        } catch (error) {
            console.log("error", error);
        }
    }

    const handlePlaceOrder = async () => {
        try {
            const orderData = {
                userId: user.id,
                cartItems: cart,
                totalPrice: total,
                shippingAddress: selectedAddress,
                paymentMethod: selectedPaymentMethod,
            };

            const data = await placeOrder(orderData);
            debugger
            if (data.success) {
                dispatch(cleanCart());
                navigation.navigate("Main")
                Toast.show({
                    type: "success",
                    text1: "Order placed Successfuly!",
                    text2: "You order delivery will be done soon.",
                    position: "top",
                    visibilityTime: 3000,
                    autoHide: true,
                });
                console.log("order created successfully", data.data);
            } else {
                Toast.show({
                    type: "error",
                    text1: "somthing went wrong while placing your order!",
                    text2: "Please try again after some time.",
                    position: "top",
                    visibilityTime: 3000,
                    autoHide: true,
                });
                console.log("error creating order", data.data);
            }
        } catch (error) {
            console.log("errror", error);
        }
    };


    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <Stepper currentStep={currentStep} stepsToShow={steps} />

                {currentStep == 1 && (
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Select Delivery Address
                        </Text>

                        <Pressable>
                            {addresses?.map((item: any, index) => (
                                <Pressable
                                    style={{
                                        borderWidth: 1,
                                        borderColor: "#D0D0D0",
                                        padding: 10,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 5,
                                        paddingBottom: 17,
                                        marginVertical: 7,
                                        borderRadius: 6,
                                    }}
                                >
                                    {selectedAddress && selectedAddress._id === item?._id ? (
                                        <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                                    ) : (
                                        <Entypo
                                            onPress={() => setSelectedAdress(item)}
                                            name="circle"
                                            size={20}
                                            color="gray"
                                        />
                                    )}

                                    <View style={{ marginLeft: 6 }}>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 3,
                                            }}
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

                                        <View>
                                            {selectedAddress && selectedAddress._id === item?._id && (
                                                <Pressable
                                                    onPress={() => setCurrentStep(currentStep + 1)}
                                                    style={{
                                                        backgroundColor: "#008397",
                                                        padding: 10,
                                                        borderRadius: 20,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        marginTop: 10,
                                                    }}
                                                >
                                                    <Text style={{ textAlign: "center", color: "white" }}>
                                                        Deliver to this Address
                                                    </Text>
                                                </Pressable>
                                            )}
                                        </View>
                                    </View>
                                </Pressable>
                            ))}
                        </Pressable>
                    </View>
                )}

                {currentStep == 2 && (
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            Choose your delivery options
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: "white",
                                padding: 8,
                                gap: 7,
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                marginTop: 10,
                            }}
                        >
                            {deliveryOption ? (
                                <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                            ) : (
                                <Entypo
                                    onPress={() => setDeliveryOption(!deliveryOption)}
                                    name="circle"
                                    size={20}
                                    color="gray"
                                />
                            )}

                            <Text style={{ flex: 1 }}>
                                <Text style={{ color: "green", fontWeight: "500" }}>
                                    Tomorrow by 10pm
                                </Text>{" "}
                                - FREE delivery with your Prime membership
                            </Text>
                        </View>

                        <Pressable
                            onPress={() => setCurrentStep(currentStep + 1)}
                            style={{
                                backgroundColor: "#FFC72C",
                                padding: 10,
                                borderRadius: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 15,
                            }}
                        >
                            <Text>Continue</Text>
                        </Pressable>
                    </View>
                )}

                {currentStep == 3 && (
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            Select your payment Method
                        </Text>

                        <View
                            style={{
                                backgroundColor: "white",
                                padding: 8,
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 7,
                                marginTop: 12,
                            }}
                        >
                            {selectedPaymentMethod === "cash" ? (
                                <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                            ) : (
                                <Entypo
                                    onPress={() => setSelectedPaymentMethod("cash")}
                                    name="circle"
                                    size={20}
                                    color="gray"
                                />
                            )}

                            <Text>Cash on Delivery</Text>
                        </View>

                        <View
                            style={{
                                backgroundColor: "white",
                                padding: 8,
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 7,
                                marginTop: 12,
                            }}
                        >
                            {selectedPaymentMethod === "online" ? (
                                <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                            ) : (
                                <Entypo
                                    onPress={() => {
                                        setSelectedPaymentMethod("online");
                                        // Alert.alert("UPI/Debit card", "Pay Online", [
                                        //     {
                                        //         text: "Cancel",
                                        //         onPress: () => console.log("Cancel is pressed"),
                                        //     },
                                        //     {
                                        //         text: "OK",
                                        //         onPress: () => pay(),
                                        //     },
                                        // ]);
                                    }}
                                    name="circle"
                                    size={20}
                                    color="gray"
                                />
                            )}

                            <Text>UPI / Credit or debit card</Text>
                        </View>
                        <Pressable
                            onPress={() => setCurrentStep(currentStep + 1)}
                            style={{
                                backgroundColor: "#FFC72C",
                                padding: 10,
                                borderRadius: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 15,
                            }}
                        >
                            <Text>Continue</Text>
                        </Pressable>
                    </View>
                )}

                {currentStep === 4 && selectedPaymentMethod === "cash" && (
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 8,
                                backgroundColor: "white",
                                padding: 8,
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                marginTop: 10,
                            }}
                        >
                            <View>
                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                                    Save 5% and never run out
                                </Text>
                                <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                                    Turn on auto deliveries
                                </Text>
                            </View>

                            <MaterialIcons
                                name="keyboard-arrow-right"
                                size={24}
                                color="black"
                            />
                        </View>

                        <View
                            style={{
                                backgroundColor: "white",
                                padding: 8,
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                marginTop: 10,
                            }}
                        >
                            <Text>Shipping to {selectedAddress?.name}</Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginTop: 8,
                                }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                                    Items
                                </Text>

                                <Text style={{ color: "gray", fontSize: 16 }}>₹{total}</Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginTop: 8,
                                }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                                    Delivery
                                </Text>

                                <Text style={{ color: "gray", fontSize: 16 }}>₹0</Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginTop: 8,
                                }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                                    Order Total
                                </Text>

                                <Text
                                    style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
                                >
                                    ₹{total}
                                </Text>
                            </View>
                        </View>

                        <View
                            style={{
                                backgroundColor: "white",
                                padding: 8,
                                borderColor: "#D0D0D0",
                                borderWidth: 1,
                                marginTop: 10,
                            }}
                        >
                            <Text style={{ fontSize: 16, color: "gray" }}>Pay With</Text>

                            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
                                Pay on delivery (Cash)
                            </Text>
                        </View>

                        <Pressable
                            onPress={handlePlaceOrder}
                            style={{
                                backgroundColor: "#FFC72C",
                                padding: 10,
                                borderRadius: 20,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 20,
                            }}
                        >
                            <Text>Place your order</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

export default ConfirmationScreen