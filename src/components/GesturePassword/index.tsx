import React from "react";
import * as helper from "./helper";
import {
    PanResponder,
    PanResponderInstance,
} from "react-native";
import {Props, State, Position} from "./types";
import Line from "./Line";
import Lines from "./Lines";
import Circles from "./Circles";
import Container from "./Container";


class GesturePassword extends React.PureComponent<Props, State> {
    private timer?: number;
    private lastIndex: number = -1;
    private sequence: string = '';
    private isMoving: boolean = false;
    private _panResponder?: PanResponderInstance;
    private refLine?: Line;

    constructor(props) {
        super(props);

        this.state = {
            lines: [],
            circles: this.initCircles()
        }
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            // 开始手势操作
            onPanResponderGrant: (e) => this.onStart(e),
            // 移动操作
            onPanResponderMove: (e) => this.onMove(e),
            // 释放手势
            onPanResponderRelease: () => this.onEnd(),
        });
    }

    private getPosition = (e) => {
        let x = helper.config.isVertical
            ? e.nativeEvent.pageX
            : e.nativeEvent.pageX - helper.config.Width / 3.4;
        let y = helper.config.isVertical
            ? e.nativeEvent.pageY - helper.config.Top / 1.25
            : e.nativeEvent.pageY - 30;
        return {x, y}
    }

    private onStart = (e) => {
        this.sequence = "";
        this.lastIndex = -1;
        this.isMoving = false;
        const {x, y} = this.getPosition(e);
        const lastChar = this.getTouchChar({x, y});
        if (lastChar) {
            this.isMoving = true;
            this.lastIndex = Number(lastChar);
            this.sequence = lastChar as String;
            this.resetActive();
            this.setActive(this.lastIndex);
            const point = {
                x: this.state.circles[this.lastIndex].x,
                y: this.state.circles[this.lastIndex].y,
            };
            this.setLinePosition({start: point, end: point})
            this.props.onStart && this.props.onStart();
            if (this.props.interval > 0 && this.timer) {
                clearTimeout(this.timer);
            }
        }
    }

    private onMove = (e) => {
        if (this.isMoving) {
            const {x, y} = this.getPosition(e);
            this.setLinePosition({end: {x, y}});

            let lastChar: string;
            if (!helper.isPointInCircle({x, y}, this.state.circles[this.lastIndex], helper.config.Radius)) {
                lastChar = this.getTouchChar({x, y}) as String;
            }
            if (lastChar && this.sequence.indexOf(lastChar) === -1) {
                if (!this.props.allowCross) {
                    let crossChar = this.getCrossChar(lastChar) as String;
                    if (crossChar && this.sequence.indexOf(crossChar) === -1) {
                        this.sequence += crossChar;
                        this.setActive(Number(crossChar));
                    }
                }
                let lastIndex = this.lastIndex;
                let thisIndex = Number(lastChar);
                this.setState({
                    lines: [
                        ...this.state.lines,
                        {
                            start: {
                                x: this.state.circles[lastIndex].x,
                                y: this.state.circles[lastIndex].y,
                            },
                            end: {
                                x: this.state.circles[thisIndex].x,
                                y: this.state.circles[thisIndex].y,
                            },
                        },
                    ]
                } as State);
                this.lastIndex = thisIndex;
                this.sequence += lastChar;
                this.setActive(this.lastIndex);
                let point = {
                    x: this.state.circles[this.lastIndex].x,
                    y: this.state.circles[this.lastIndex].y,
                };

                this.setLinePosition({start: point});
            }

            if (this.sequence.length === 9) {
                this.onEnd()
            }
        }
    }

    private onEnd = () => {
        const password = helper.getRealPassword(this.sequence);
        this.sequence = "";
        this.lastIndex = -1;
        this.isMoving = false;
        let origin = {x: 0, y: 0};

        this.setLinePosition({start: origin, end: origin});

        this.props.onEnd && this.props.onEnd(password);

        if (this.props.interval > 0) {
            this.timer = setTimeout(() => this.resetActive(), this.props.interval!);
        }
    }

    private setLinePosition = (p: Position) => {
        const obj: Position = {};
        if (p.start) {
            obj.start = p.start
        }
        if (p.end) {
            obj.end = p.end
        }
        this.refLine && this.refLine.setNativeProps(obj);

    }

    private getTouchChar = (touch) => {
        let x = touch.x;
        let y = touch.y;
        for (let i = 0; i < 9; i++) {
            if (helper.isPointInCircle({x, y}, this.state.circles[i], helper.config.Radius)) {
                return String(i);
            }
        }
        return false;
    }

    private initCircles = () => {
        const Margin = helper.config.Radius;
        return [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            const p = i % 3;
            const q = parseInt(String(i / 3));
            return {
                isActive: false,
                x: p * (helper.config.Radius * 2 + Margin) + Margin + helper.config.Radius,
                y: q * (helper.config.Radius * 2 + Margin) + Margin + helper.config.Radius,
            }
        })
    }

    public resetActive = () => {
        this.setState({circles: this.initCircles(), lines: []} as State);
        this.props.onReset && this.props.onReset();
    }

    private setActive = (index) => {
        const circles = [...this.state.circles];
        if (circles[index]) {
            circles[index].isActive = true;
            this.setState({circles} as State);
        }
    }

    private getCrossChar = (char) => {
        let middles = "13457";
        let last = String(this.lastIndex);
        if (middles.indexOf(char) > -1 || middles.indexOf(last) > -1) {
            return false;
        }
        let point = helper.getMiddlePoint(
            this.state.circles[last],
            this.state.circles[char],
        );
        for (let i = 0; i < middles.length; i++) {
            let index = middles[i];
            if (helper.isEquals(point, this.state.circles[index])) {
                return String(index);
            }
        }
        return false;
    }

    render() {
        const color = this.props.status === "wrong" ? this.props.wrongColor : this.props.rightColor;
        const {
            textStyle,
            style,
            status,
            message,
            normalColor,
            wrongColor,
            rightColor,
            innerCircle,
            outerCircle,
            transparentLine,
            children,
        } = this.props;
        return <Container
            textStyle={textStyle}
            style={style}
            status={status}
            message={this.state.message || message}
            wrongColor={wrongColor}
            rightColor={rightColor}
            panHandlers={this._panResponder!.panHandlers}
            userAddedChildren={children}
        >
            <Circles
                circles={this.state.circles}
                status={status}
                normalColor={normalColor}
                wrongColor={wrongColor}
                rightColor={rightColor}
                innerCircle={innerCircle}
                outerCircle={outerCircle}
            />
            <Lines
                lines={this.state.lines}
                status={status}
                wrongColor={wrongColor}
                rightColor={rightColor}
                transparentLine={transparentLine}
            />
            <Line ref={(e) => this.refLine = e} color={transparentLine ? "#00000000" : color}/>
        </Container>
    }
}

GesturePassword['defaultProps'] = {
    message: "",
    normalColor: "#5FA8FC",
    rightColor: "#5FA8FC",
    wrongColor: "#D93609",
    status: "normal",
    interval: 0,
    allowCross: false,
    innerCircle: true,
    outerCircle: true,
}


export default GesturePassword;