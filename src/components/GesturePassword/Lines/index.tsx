import React, {FC, memo} from "react";
import {Props, Position} from "../types";
import Line from "../Line";

interface LinesProps extends Props {
    lines: Position[];
}

const Lines: FC<LinesProps> = memo((props: LinesProps) => {
    const {
        lines,
        status,
        wrongColor,
        rightColor,
        transparentLine
    } = props;
    let color;
    return <React.Fragment>
        {lines.map(function (l, i) {
            color = status === "wrong" ? wrongColor : rightColor;
            color = transparentLine ? "#00000000" : color;
            return <Line key={"l_" + i} color={color} start={l.start} end={l.end}/>;
        })}
    </React.Fragment>;
});

export default Lines;