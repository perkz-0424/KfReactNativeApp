import React, {FC} from "react";
import {Dimensions, View, StyleSheet, ViewStyle, Image, ListViewDataSource} from "react-native";
import ListView from "deprecated-react-native-listview";
import isEqual from 'lodash.isequal';
import differenceBy from 'lodash.differenceby';
import Task from 'data.task';
import Column from "./components/Column";

const styles = StyleSheet.create({
    masonryContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%'
    },
    masonryColumn: {
        flexDirection: 'column'
    }
});

export interface BrickType {
    uri: string;
    key?: string;
    renderFooter?: (data) => React.ReactElement;
    renderHeader?: (data) => React.ReactElement;
    onPress?: (e) => void;
    data?: { [key: string]: any }
}

interface Props {
    bricks?: BrickType[];
    columns?: number;
    sorted?: boolean;
    imageContainerStyle?: ViewStyle;
    customImageComponent?: (...arg) => void;
    customImageProps?: Object;
    spacing?: number;
    priority?: string;
    refreshControl?: React.ReactElement;
    onEndReached?: () => void;
    onEndReachedThreshold?: number;
}

interface Data {

}

interface State {
    ds: ListViewDataSource;
    dimensions: { width?: number; height?: number };
    initialOrientation: boolean;
    _sortedData: Data[];
    _resolvedData: Data[];
    _columnHeights: number[];
    _uniqueCount: number;
}

export const resolveImage = (data) => {
    return new Task((reject, resolve) => Image.getSize(data.uri, (width, height) => resolve({
        ...data,
        dimensions: {
            width,
            height
        }
    }), (err) => reject(err)));
};
export const assignObjectColumn = (nColumns, index, targetObject) => ({...targetObject, ...{column: index % nColumns}});
export const assignObjectIndex = (index, targetObject) => ({...targetObject, ...{index}});
export const findMinIndex = (srcArray) => srcArray.reduce((shortest, cValue, cIndex, cArray) => (cValue < cArray[shortest]) ? cIndex : shortest, 0);
export const containMatchingUris = (r1, r2) => isEqual(r1.map(brick => brick.uri), r2.map(brick => brick.uri));
export const generateColumnHeights = count => Array(count).fill(0);
const INVALID_COLUMN_WIDTH = -1;
const PRIORITY_BALANCE = "balance";
const PRIORITY_ORDER = "order";


class Masonry extends React.PureComponent<Props, State> {
    private ds = new ListView.DataSource({rowHasChanged: (r1, r2) => !containMatchingUris(r1, r2)})

    constructor(props) {
        super(props);
        const columnHeights = generateColumnHeights(props.columns);
        this.state = {
            dataSource: this.ds.cloneWithRows([]),
            dimensions: {},
            initialOrientation: true,
            _sortedData: [],
            _resolvedData: [],
            _columnHeights: columnHeights,
            _uniqueCount: props.bricks.length
        }
        Dimensions.addEventListener('change', this.onChange);
    }

    private onChange = () => {
        this.setState(state => ({initialOrientation: !state.initialOrientation}));
    }

    public componentDidMount() {
        if (!this.isBalancingEnabled()) {
            this.resolveBricks(this.props);
        }
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        const differentColumns = this.props.columns !== nextProps.columns;
        const differentPriority = this.props.priority !== nextProps.priority;
        const brickDiff = differenceBy(nextProps.bricks, this.props.bricks, 'uri');
        const appendedData = brickDiff.length !== nextProps.bricks.length;
        const _uniqueCount = brickDiff.length + this.props.bricks!.length;
        if (differentColumns || differentPriority || !appendedData) {
            this.setState(() => ({
                _sortedData: [],
                _resolvedData: [],
                _columnHeights: generateColumnHeights(nextProps.columns),
                _uniqueCount
            } as State), () => {
                this.resolveBricks(nextProps)
            });
        }
        if (appendedData) {
            const offSet = this.props.bricks!.length;
            this.setState({
                _uniqueCount
            } as State, () => {
                this.resolveBricks({...nextProps, bricks: brickDiff}, offSet)
            });
        }
    }

    private isBalancingEnabled = () => {
        const {priority} = this.props;
        return priority == PRIORITY_BALANCE;
    }

    public componentWillUnmount() {
        Dimensions.removeEventListener('change', this.onChange);
    }

    private getColumnWidth = (width, spacing, columns) => {
        const gutterBase = width / 100;
        const gutterSize = gutterBase * spacing;
        return (width / columns) - (gutterSize / 2);
    }

    private resolveBricks = ({bricks, columns, spacing}: Props, offSet = 0) => {
        if (bricks!.length === 0) {
            this.setState(state => ({
                dataSource: state.dataSource.cloneWithRows([])
            } as State));
        }

        let columnWidth = INVALID_COLUMN_WIDTH;
        if (this.isBalancingEnabled()) {
            const {dimensions: {width}} = this.state;
            columnWidth = this.getColumnWidth(width, spacing, columns);
        }

        bricks!.map((brick, index) => assignObjectColumn(columns, index, brick))
            .map((brick, index) => assignObjectIndex(offSet + index, brick))
            .map(brick => resolveImage(brick))
            .map(resolveTask => resolveTask.fork(
                () => console.warn('图片加载失败'),
                (resolvedBrick) => {
                    this.setState(state => {
                        const sortedData = this._insertIntoColumn(resolvedBrick, state._sortedData, state._columnHeights, columnWidth);
                        return {
                            dataSource: state.dataSource.cloneWithRows(sortedData),
                            _sortedData: sortedData,
                            _resolvedData: [...state._resolvedData, resolvedBrick]
                        } as State;
                    });
                }));
    }

    private _insertIntoColumn = (resolvedBrick, dataSet, _columnHeights, columnWidth) => {
        let dataCopy = dataSet.slice();
        const priority = this.props.priority;
        let columnIndex;

        switch (priority) {
            case PRIORITY_BALANCE:
                columnIndex = findMinIndex(_columnHeights);
                const heightsCopy = _columnHeights.slice();
                const newColumnHeights = heightsCopy[columnIndex] + (columnWidth * resolvedBrick.dimensions.height / resolvedBrick.dimensions.width);
                heightsCopy[columnIndex] = newColumnHeights;
                this.setState({
                    _columnHeights: heightsCopy
                } as State);
                break;
            case PRIORITY_ORDER:
            default:
                columnIndex = resolvedBrick.column;
                break;
        }
        const column = dataSet[columnIndex];
        const sorted = this.props.sorted;

        if (column) {
            let bricks = [...column, resolvedBrick];
            if (sorted) {
                bricks = bricks.sort((a, b) => (a.index < b.index) ? -1 : 1);
            }
            dataCopy[columnIndex] = bricks;
        } else {
            dataCopy = [...dataCopy, [resolvedBrick]];
        }

        return dataCopy;
    };

    private _setParentDimensions = (event) => {
        const {width, height} = event.nativeEvent.layout;
        this.setState({
            dimensions: {width, height}
        } as State, () => {
            if (this.isBalancingEnabled()) {
                this.resolveBricks(this.props);
            }
        });
    }

    private _delayCallEndReach = () => {
        const {_sortedData, _uniqueCount} = this.state;
        const sortedLength = _sortedData.reduce((acc, cv) => cv.length + acc, 0);
        if (sortedLength === _uniqueCount) {
            this.props.onEndReached!();
        }
    }


    public render() {
        const {dimensions, dataSource} = this.state;
        return (
            <View style={{flex: 1}} onLayout={(event) => this._setParentDimensions(event)}>
                <ListView
                    contentContainerStyle={styles.masonryContainer}
                    dataSource={dataSource}
                    enableEmptySections
                    scrollRenderAheadDistance={100}
                    removeClippedSubviews={false}
                    onEndReached={this._delayCallEndReach}
                    onEndReachedThreshold={this.props.onEndReachedThreshold}
                    renderRow={(data, sectionId, rowID) => {
                        return <Column
                            images={this.props.bricks}
                            data={data}
                            columns={this.props.columns}
                            parentDimensions={dimensions}
                            imageContainerStyle={this.props.imageContainerStyle}
                            customImageComponent={this.props.customImageComponent}
                            customImageProps={this.props.customImageProps}
                            spacing={this.props.spacing}
                            key={`RN-MASONRY-COLUMN-${rowID}`}
                        />
                    }}
                    refreshControl={this.props.refreshControl}/>
            </View>
        );
    }
}


Masonry.defaultProps = {
    bricks: [],
    columns: 2,
    sorted: false,
    imageContainerStyle: {},
    spacing: 1,
    priority: 'order',
    onEndReached: () => ({}),
    onEndReachedThreshold: 25
}

export default Masonry;