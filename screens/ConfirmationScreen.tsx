import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import Stepper from '@/components/Stepper';

const ConfirmationScreen = () => {
    const [step, setStep] = useState(1);
    const steps = [
        { title: "Address", content: "Address Form" },
        { title: "Delivery", content: "Delivery Options" },
        { title: "Payment", content: "Payment Details" },
        { title: "Place Order", content: "Order Summary" },
    ];
    const [addresses, setAddresses] = useState([]);
    

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Stepper currentStep={step} stepsToShow={steps} />

            {/* Buttons for navigation */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
                <Button title="Back" disabled={step === 1} onPress={() => setStep(prev => prev - 1)} />
                <Button title="Next" disabled={step === 4} onPress={() => setStep(prev => prev + 1)} />
            </View>
        </View>
    )
}

export default ConfirmationScreen