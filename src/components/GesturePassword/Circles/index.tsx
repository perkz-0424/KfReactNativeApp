import React, {FC, memo} from "react";
import {Props, CircleType} from "../types";
import Circle from "../Circle";
import * as helper from "../helper";


interface PropsCircles extends Props{
    circles: CircleType[];
}

const Circles: FC<PropsCircles> = memo((props: PropsCircles) => {
    const {
        circles,
        status,
        normalColor,
        wrongColor,
        rightColor,
        innerCircle,
        outerCircle,
    } = props;

    let fill, color, inner, outer;

    return <React.Fragment>
        {circles.map(function(c, i) {
            fill = c.isActive;
            color = status === "wrong" ? wrongColor : rightColor;
            inner = !!innerCircle;
            outer = !!outerCircle;

            return (
                <Circle
                    key={"c_" + i}
                    fill={fill}
                    normalColor={normalColor}
                    color={color}
                    x={c.x}
                    y={c.y}
                    r={helper.config.Radius}
                    inner={inner}
                    outer={outer}
                />
            );
        })}
    </React.Fragment>;
});

export default Circles;