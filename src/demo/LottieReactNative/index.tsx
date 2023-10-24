import React, {FC} from "react";
import {SafeAreaView, ScrollView, Text} from "react-native";
import Lottie from 'lottie-react-native';


interface Props {

}

const LottieReactNative: FC<Props> = () => {
    const animationRef = React.useRef<Lottie | null>(null);

    React.useEffect(() => {

    }, []);

    return <SafeAreaView>
        <ScrollView>
            <Lottie source={require('./animation.json')} autoPlay loop style={{width: 100}}/>
        </ScrollView>
    </SafeAreaView>;
};

export default LottieReactNative;