import React from "react";
import {Animated, View, StyleSheet, PanResponder} from "react-native";

interface Props {

}

const PanResponderDemo: React.FC<Props> = (props) => {
    const pan = React.useRef<Animated.ValueXY>(new Animated.ValueXY()).current;
    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({x: pan.x['_value'], y: pan.y['_value']}); // 开始偏移
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    {dx: pan.x, dy: pan.y}
                ], {
                    useNativeDriver: false
                }
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset(); // 偏移重置
            }
        })
    ).current;

    React.useEffect(() => {

    }, []);

    return React.useMemo(() => <View style={styles.container}>
        <Animated.View
            style={{
                transform: [{translateX: pan.x}, {translateY: pan.y}]
            }}
            {...panResponder.panHandlers}
        >
            <View style={styles.box}/>
        </Animated.View>
    </View>, []);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    box: {
        height: 50,
        width: 50,
        backgroundColor: "#f40",
        borderRadius: 5
    }
});

export default PanResponderDemo;