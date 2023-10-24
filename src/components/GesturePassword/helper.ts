import {Dimensions} from "react-native";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

export function isPointInCircle(point, center, radius) {
    let d = getDistance(point, center);

    return d <= radius;
}

export function getDistance(pt1 = {x: 0, y: 0}, pt2 = {x: 0, y: 0}) {
    let a = Math.pow(pt1.x - pt2.x, 2);
    let b = Math.pow(pt1.y - pt2.y, 2);
    return Math.sqrt(a + b);
}

export function getTransform(pt1 = {x: 0, y: 0}, pt2 = {x: 0, y: 0}) {
    let d = getDistance(pt1, pt2);

    let c = (pt2.x - pt1.x) / d;
    let a = Math.acos(c); // 旋转角度
    if (pt1.y > pt2.y) a = 2 * Math.PI - a;

    let c1 = {
        x: pt1.x + d / 2,
        y: pt1.y,
    };
    let c2 = {
        x: (pt2.x + pt1.x) / 2,
        y: (pt2.y + pt1.y) / 2,
    };
    let x = c2.x - c1.x;
    let y = c2.y - c1.y;

    return {d, a, x, y};
}

export function isEquals(pt1 = {x: 0, y: 0}, pt2 = {x: 0, y: 0}) {
    return pt1.x === pt2.x && pt1.y === pt2.y;
}

export function getMiddlePoint(pt1 = {x: 0, y: 0}, pt2 = {x: 0, y: 0}) {
    return {
        x: (pt2.x + pt1.x) / 2,
        y: (pt2.y + pt1.y) / 2,
    };
}

export function getRealPassword(str) {
    return str.replace(/\d/g, function ($0) {
        return Number($0) + 1;
    });
}

const isVertical = Height > Width;
const Top = isVertical ? ((Height - Width) / 2.0) * 1.25 : 10;
const Radius = isVertical ? Width / 10 : Width / 25;

export const config = {
    Width, Height, isVertical, Top, Radius
}