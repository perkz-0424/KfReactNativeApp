import React, {FC, memo, useMemo} from "react";
import {GestureResponderHandlers, StyleSheet, I18nManager, View, Text} from "react-native";
import * as helper from "../helper";

import {Props} from "../types";

interface PropsContainer extends Props {
    userAddedChildren?: React.ReactElement;
    panHandlers?: GestureResponderHandlers;
}


const Container: FC<PropsContainer> = memo((props: PropsContainer) => {
    const {
        textStyle,
        style,
        status,
        message,
        wrongColor,
        rightColor,
        panHandlers,
        children,
        userAddedChildren,
    } = props;
    let color = status === "wrong" ? wrongColor : rightColor;
    const _styleContainer = useMemo(() => [styles.frame, style], [style]);
    const _styleText = useMemo(() => [styles.msgText, textStyle, {color: color}], [textStyle, color]);
    return <View style={_styleContainer}>
        <View style={styles.message}>
            <Text style={_styleText}>{message}</Text>
        </View>
        <View style={styles.board} {...panHandlers}>
            {children}
        </View>
        {userAddedChildren}
    </View>;
});

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
        backgroundColor: "#292B38",
    },

    msgText: {
        fontSize: 14,
    },

    message: {
        position: "absolute",
        left: 0,
        top: 20,
        width: helper.config.Width,
        height: helper.config.Top / 3,
        alignItems: "center",
        justifyContent: "center",
    },

    board: {
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
        position: "absolute",
        left: helper.config.isVertical ? 0 : helper.config.Width / 3.4,
        top: helper.config.isVertical ? helper.config.Top / 1.5 : 30,
        width: helper.config.Width,
        height: helper.config.Height,
    },
});

export default Container;