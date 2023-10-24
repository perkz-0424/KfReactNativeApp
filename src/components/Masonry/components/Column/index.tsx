import React from "react";
import {ViewStyle, View} from "react-native";
import ImageLightBox from "../../../ImageLightBox";
import {BrickType} from "../../index";


export function _getImageTag(props) {
    return (props.uri ? <ImageLightBox
        uri={props.uri}
        style={{
            width: props.width || undefined,
            height: props.height || undefined,
        }}
    /> : <></>)
}

export function _getTouchableUnit(image) {
    return _getImageTag(image);
}

export interface Data {
    column: number;
    dimensions: { width: number, height: number }
    index: number;
    uri?: string;
}

interface Props {
    data: Data[];
    columns: number;
    parentDimensions?: { width?: number, height?: number }
    columnKey?: string;
    imageContainerStyle?: ViewStyle;
    customImageComponent?: (...arg) => void;
    customImageProps?: Object;
    spacing?: number;
    images?: BrickType[];
}

interface State {
    images: string[];
    columnWidth: number
}

class Column extends React.PureComponent<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            columnWidth: 0
        };
    }

    UNSAFE_componentWillMount() {
        this.setState({
            images: this._resizeImages(this.props.data, this.props.parentDimensions, this.props.columns)
        } as State);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            images: this._resizeImages(nextProps.data, nextProps.parentDimensions, nextProps.columns)
        } as State);
    }

    private _resizeImages(data, parentDimensions, nColumns) {
        return Object.keys(data).map((key) => {
            const image = data[key];
            const imageSizedForColumn =
                this._resizeByColumns(data[key].dimensions, parentDimensions, nColumns);
            return {
                ...image,
                ...imageSizedForColumn
            };
        });
    }

    private _resizeByColumns(imgDimensions = {width: 0, height: 0}, parentDimensions, nColumns = 2) {
        const {width} = parentDimensions;
        const gutterBase = width / 100;
        const gutterSize = gutterBase * this.props.spacing;
        const columnWidth = (width / nColumns) - (gutterSize / 2);
        if (this.state.columnWidth !== columnWidth) {
            this.setState({
                columnWidth
            } as State);
        }
        const divider = imgDimensions.width / columnWidth;
        const newWidth = imgDimensions.width / divider;
        const newHeight = imgDimensions.height / divider;
        return {width: newWidth, height: newHeight, gutter: gutterSize};
    }

    private _renderBrick = (data) => {
        const brick = data.item;
        const gutter = (data.index === 0) ? 0 : brick.gutter;
        const key = `RN-MASONRY-BRICK-${brick.column}-${data.index}`;
        const {imageContainerStyle, customImageComponent, customImageProps} = this.props;
        const props = {...brick, gutter, key, imageContainerStyle, customImageComponent, customImageProps};
        const image = (props.onPress) ? _getTouchableUnit(props) : _getImageTag(props);
        const footer = (props.renderFooter) ? props.renderFooter(props.data) : null;
        const header = (props.renderHeader) ? props.renderHeader(props.data) : null;

        return <View key={props.key} style={{marginTop: 2.5}}>
            {header}
            {image}
            {footer}
        </View>;
    }

    private _keyExtractor = (item) => ("IMAGE-KEY-" + item.uri + "---" + (item.key ? item.key : "0"));


    render() {
        const {columnWidth, images} = this.state;
        return <View
            style={[{
                width: columnWidth || undefined,
                overflow: 'hidden',
                flexDirection: 'column',
            }]}>
            {images.map((i, key) => {
                return <React.Fragment key={this._keyExtractor(i)}>
                    {this._renderBrick({item: i, index: key})}
                </React.Fragment>
            })}
        </View>
    }
}

Column.defaultProps = {
    imageContainerStyle: {},
    spacing: 1,
    images: []
}

export default Column;