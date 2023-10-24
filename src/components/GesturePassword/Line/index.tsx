import React from "react";
import {ColorValue, StyleSheet, View} from "react-native";
import * as helper from "../helper";

interface Props {
    color?: ColorValue;
    start?: {
        x: number;
        y: number;
    };
    end?: {
        x: number;
        y: number;
    }
    transparentLine?: boolean;
}

class Line extends React.PureComponent<Props, Props> {

    constructor(props) {
        super(props);
        this.state = {
            start: {
                x: 0, y: 0
            },
            end: {x: 0, y: 0},
            color: "#8E91A8",
            ...props
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.color !== state.color) {
            return {
                color: props.color,
            };
        }
        return null;
    }

    public setNativeProps = (props: Props) => {
        this.setState(props);
    }

    render() {
        let {start, end, color, transparentLine} = this.state;
        if (helper.isEquals(start, end)) {
            return <></>
        }
        let transform = helper.getTransform(start, end);
        let length = transform.d;
        let angle = transform.a + "rad";
        let moveX = transform.x;
        let moveY = transform.y;
        color = transparentLine ? "#00000000" : color;


        return <>
            <View
                style={[
                    styles.line,
                    {
                        backgroundColor: color,
                        left: start!.x,
                        top: start!.y,
                        width: length,
                    },
                    {
                        transform: [
                            {translateX: moveX},
                            {translateY: moveY},
                            {rotateZ: angle},
                        ],
                    },
                ]}
            />
        </>
    }
}

Line['defaultProps'] = {
    color: "#8E91A8",
    start: {x: 0, y: 0},
    end: {x: 0, y: 0},
}

const styles = StyleSheet.create({
    line: {
        position: "absolute",
        height: 1,
    },
});

export default Line;