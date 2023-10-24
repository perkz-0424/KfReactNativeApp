import React, {FC, memo, useMemo} from "react";
import {ColorValue, StyleSheet, View} from "react-native";

interface Props {
    color?: ColorValue;
    normalColor?: ColorValue;
    fill?: boolean;
    x?: number;
    y?: number;
    r?: number;
    inner?: boolean;
    outer?: boolean;
}

const Circle: FC<Props> = memo((props: Props) => {

    const {color, normalColor, fill, x, y, r, inner, outer} = props;
    const _styleContainer = useMemo(
        () => [
            styles.outer,
            {
                left: x - r,
                top: y - r,
                width: 2 * r,
                height: 2 * r,
                borderRadius: r,
            },
            {borderColor: normalColor},
            fill && {borderColor: color},
            !outer && {borderWidth: 0},
        ],
        [x, r, y, normalColor, color, fill, outer],
    );

    const _styleInner = useMemo(
        () => [
            !outer && styles.inner,
            {width: (2 * r) / 3, height: (2 * r) / 3, borderRadius: r / 3},
            fill && {backgroundColor: color},
        ],
        [r, outer, fill, color],
    );

    React.useEffect(() => {

    }, []);
    return <React.Fragment>
        <View style={_styleContainer}>{inner && <View style={_styleInner}/>}</View>
    </React.Fragment>;
})

Circle['defaultProps'] = {
    inner: true,
    outer: true,
};

const styles = StyleSheet.create({
    outer: {
        position: "absolute",
        borderColor: "#8E91A8",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    inner: {
        backgroundColor: "#8E91A8",
    },
});

export default Circle;