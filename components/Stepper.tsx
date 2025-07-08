// Stepper.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type StepperProps = {
    currentStep: number; // 1 to 4
    totalSteps?: number;
    stepsToShow?: Array<any>
};

const Stepper: React.FC<StepperProps> = ({ currentStep, stepsToShow, totalSteps = 4 }) => {
    return (
        <View style={styles.container}>
            {Array.from({ length: totalSteps }, (_, index) => {
                const step = index + 1;
                const isActive = step === currentStep;
                const isCompleted = step < currentStep;

                return (
                    <View key={index} style={{flexDirection:'column'}}>
                        <View key={step} style={styles.stepContainer}>
                            <View
                                style={[
                                    styles.circle,
                                    isCompleted && styles.completedCircle,
                                    isActive && styles.activeCircle,
                                ]}
                            >
                                <Text style={styles.stepText}>{step}</Text>
                            </View>
                            {step !== totalSteps && <View style={styles.line} />}
                        </View>
                        {stepsToShow && <View>
                            <Text style={styles.titleText}>{stepsToShow[index].title}</Text>
                        </View>}
                    </View>
                );
            })}
        </View>
    );
};

export default Stepper;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        justifyContent: 'center',
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#ccc',
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeCircle: {
        borderColor: '#007bff',
        backgroundColor: '#007bff',
    },
    completedCircle: {
        backgroundColor: '#28a745',
        borderColor: '#28a745',
    },
    stepText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    line: {
        width: 30,
        height: 2,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    titleText: {
        // marginTop: 5,
        fontSize: 12,
        color: '#333'
    },
});
