import {ColorValue, TextStyle, ViewStyle} from "react-native";
import React from "react";

export interface Props {
    message?: string;
    normalColor?: ColorValue;
    rightColor?: ColorValue;
    wrongColor?: ColorValue;
    status?: "right" | "wrong" | "normal";
    onStart?: () => void;
    onEnd?: (p: string) => void;
    onReset?: () => void;
    interval?: number;
    allowCross?: boolean;
    innerCircle?: boolean;
    outerCircle?: boolean;
    textStyle?: TextStyle;
    style?: ViewStyle;
    transparentLine? : boolean;
    children?: React.ReactElement;
}


export interface Position {
    start?: {
        x: number;
        y: number;
    };
    end?: {
        x: number;
        y: number;
    }
}

export interface CircleType {
    x: number, y: number, isActive: boolean
}

export interface State {
    lines: Position[];
    circles: CircleType[];
    message?: string;
}
