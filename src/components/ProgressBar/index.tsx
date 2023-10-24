import React, {FC} from "react";
import {StyleSheet, Animated, Easing, View, ViewStyle} from "react-native";


interface Props {
    initialProgress?: number;
    progress: number;
    easing?: (value: number) => number;
    easingDuration?: number;
    backgroundStyle?: ViewStyle;
    style?: ViewStyle;
    fillStyle?: ViewStyle;
}

const ProgressBar: FC<Props> = (props) => {
    const progressRef = React.useRef(new Animated.Value(props.initialProgress || 0));

    React.useEffect(() => {
        update();
    }, [props.progress]);

    const update = () => {
        Animated.timing(progressRef.current, {
            useNativeDriver: false,
            easing: props.easing!,
            duration: props.easingDuration!,
            toValue: props.progress
        }).start();
    };


    React.useEffect(() => {

    }, []);

    return <View style={[styles.background, props.backgroundStyle, props.style]}>
        <Animated.View style={[styles.fill, props.fillStyle, {
            width: progressRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1 * (props.style!.width || 0)],
            })
        }]}/>
    </View>;
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#bbbbbb',
        height: 5,
        overflow: 'hidden'
    },
    fill: {
        backgroundColor: '#3b5998',
        height: 5
    }
});

ProgressBar.defaultProps = {
    initialProgress: 0,
    easingDuration: 500,
    easing: Easing.inOut(Easing.ease),
    backgroundStyle: {},
    style: {},
    fillStyle: {}
}

export default ProgressBar;