import React, {FC} from "react";
import {
    View,
    ViewStyle,
    Animated,
    Easing,
    Dimensions,
    Platform,
    StyleSheet,
    StatusBar,
    Modal,
    TouchableOpacity,
    Text, TouchableWithoutFeedback, Image
} from "react-native";


const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

export interface ImageLightBoxProps {
    style?: ViewStyle;
    uri: string;
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        backgroundColor: '#000'
    },
    open: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: WINDOW_WIDTH,
        backgroundColor: 'transparent',
    },
    closeButton: {
        fontSize: 35,
        color: 'white',
        lineHeight: 40,
        width: 40,
        textAlign: 'center',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 1.5,
        shadowColor: 'black',
        shadowOpacity: 0.8,
    },
});

const springConfig = {
    tension: 4,
    friction: 30,
    useNativeDriver: false
}
const ImageLightBox: FC<ImageLightBoxProps> = (props) => {
    const rootRef = React.useRef<Image>();
    const animatedLayoutOpacity = React.useRef(new Animated.Value(1));
    const animatedOpenValue = React.useRef(new Animated.Value(0));
    const [origin, setOrigin] = React.useState({x: 0, y: 0, width: 0, height: 0});
    const [isOpen, setIsOpen] = React.useState(false);
    const [target, setTarget] = React.useState({x: 0, y: 0, opacity: 1});
    const [imageStyle, setImageStyle] = React.useState<{ height?: number | string; width?: number | string }>({});

    React.useEffect(() => {
        Image.getSize(props.uri, (w, h) => {
            if (props.style) {
                const {height, width} = props.style;
                if (height && !width) {
                    setImageStyle({width: height * w / h, height});
                } else if (!height && width) {
                    setImageStyle({width, height: width * h / w});
                } else if (height && width) {
                    setImageStyle({width, height});
                } else {
                    setImageStyle({height: h, width: w})
                }
            }
        });
    }, [props.uri]);

    const open = () => {
        if (rootRef.current) {
            rootRef.current!.measure((ox, oy, width, height, px, py) => {
                if (isIOS) {
                    StatusBar.setHidden(true, 'fade');
                }
                setIsOpen(true);
                setTarget({x: 0, y: 0, opacity: 1});
                // 获取图片的位置并隐身
                setOrigin({width, height, x: px, y: py});
                Animated.parallel([
                    setOpacity(0),
                    setOpenValue(1)
                ]).start();
            });
        }
    }

    const close = () => {
        if (isIOS) {
            StatusBar.setHidden(false, 'fade');
        }
        setOpenValue(0).start(() => {
            setOpacity(1).start(() => {
                setIsOpen(false);
            });
        });
    }

    const setOpenValue = (value) => {
        return Animated.spring(animatedOpenValue.current, {
            toValue: value,
            ...springConfig
        });
    }
    const setOpacity = (value: number) => {
        return Animated.timing(animatedLayoutOpacity.current, {
            useNativeDriver: true,
            easing: Easing.linear,
            duration: 100,
            toValue: value
        });
    }

    const opacityStyle = {
        opacity: animatedOpenValue.current.interpolate({inputRange: [0, 1], outputRange: [0, target.opacity]})
    }
    const openStyle = [styles.open, {
        left: animatedOpenValue.current.interpolate({
            inputRange: [0, 1],
            outputRange: [origin.x || 0, target.x || 0],
        }),
        top: animatedOpenValue.current.interpolate({
            inputRange: [0, 1],
            outputRange: [origin.y || 0, target.y || 0],
        }),
        width: animatedOpenValue.current.interpolate({
            inputRange: [0, 1],
            outputRange: [origin.width || 0, WINDOW_WIDTH],
        }),
        height: animatedOpenValue.current.interpolate({
            inputRange: [0, 1],
            outputRange: [origin.height || 0, WINDOW_HEIGHT],
        })
    }];

    return <React.Fragment>
        <TouchableWithoutFeedback onPress={open}>
            <View ref={rootRef} style={[imageStyle]}>
                <Animated.Image
                    style={[props.style, imageStyle, {opacity: animatedLayoutOpacity.current}]}
                    resizeMode="contain"
                    source={{uri: props.uri}}
                />
            </View>
        </TouchableWithoutFeedback>
        <Modal visible={isOpen} transparent={true} onRequestClose={close}>
            <Animated.View style={[styles.background, opacityStyle]}/>
            <Animated.View style={[openStyle]}>
                <Image
                    source={{uri: props.uri}}
                    resizeMode="contain"
                    style={{flex: 1}}
                />
            </Animated.View>
            <Animated.View style={[styles.header, opacityStyle]}>
                <TouchableOpacity onPress={close}>
                    <Text style={styles.closeButton}>×</Text>
                </TouchableOpacity>
            </Animated.View>
        </Modal>
    </React.Fragment>;
};

export default ImageLightBox;