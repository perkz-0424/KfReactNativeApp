import React from "react";
import {SafeAreaView, ScrollView, View} from "react-native";
import {
    AreaChart,
    Grid,
    StackedAreaChart,
    BarChart,
    LineChart,
    PieChart,
    ProgressCircle,
    YAxis,
    XAxis
} from 'react-native-svg-charts';
import * as shape from 'd3-shape'

const ReactNativeSvgCharts = () => {
    React.useEffect(() => {

    }, []);
    return <SafeAreaView style={{flex: 1}}>
        <ScrollView>
            <AreaChart
                style={{height: 200}}
                data={[50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]}
                contentInset={{top: 30, bottom: 30}}
                curve={shape.curveNatural}
                svg={{fill: 'rgba(134, 65, 244, 0.8)'}}
            >
                <Grid/>
            </AreaChart>
            <StackedAreaChart
                style={{height: 200, paddingVertical: 16}}
                data={[
                    {
                        month: new Date(2015, 0, 1),
                        apples: 3840,
                        bananas: 1920,
                        cherries: 960,
                        dates: 400,
                    },
                    {
                        month: new Date(2015, 1, 1),
                        apples: 1600,
                        bananas: 1440,
                        cherries: 960,
                        dates: 400,
                    },
                    {
                        month: new Date(2015, 2, 1),
                        apples: 640,
                        bananas: 960,
                        cherries: 3640,
                        dates: 400,
                    },
                    {
                        month: new Date(2015, 3, 1),
                        apples: 3320,
                        bananas: 480,
                        cherries: 640,
                        dates: 400,
                    },
                ]}
                keys={['apples', 'bananas', 'cherries', 'dates']}
                colors={['#8800cc', '#aa00ff', '#cc66ff', '#eeccff']}
                curve={shape.curveNatural}
                showGrid={false}
                svgs={[
                    {onPress: () => console.log('apples')},
                    {onPress: () => console.log('bananas')},
                    {onPress: () => console.log('cherries')},
                    {onPress: () => console.log('dates')},
                ]}
            />
            <BarChart
                style={{height: 200}}
                data={[50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80]}
                svg={{fill: 'rgb(134, 65, 244)'}}
                contentInset={{top: 30, bottom: 30}}
            >
                <Grid/>
            </BarChart>

            <LineChart
                style={{height: 200}}
                data={[50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]}
                svg={{stroke: 'rgb(134, 65, 244)'}}
                contentInset={{top: 20, bottom: 20}}
            >
                <Grid/>
            </LineChart>

            <PieChart
                style={{height: 200}}
                data={
                    [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80].filter((value) => value > 0)
                        .map((value, index) => ({
                            value,
                            svg: {
                                fill: ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7),
                                onPress: () => console.log('press', index),
                            },
                            key: `pie-${index}`,
                        }))
                }
            />

            <ProgressCircle
                style={{height: 200}}
                progress={0.7}
                progressColor={'rgb(134, 65, 244)'}
            />

            <View style={{height: 200, flexDirection: 'row'}}>
                <YAxis
                    data={[50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]}
                    contentInset={{top: 20, bottom: 20}}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}ºC`}
                />
                <LineChart
                    style={{flex: 1, marginLeft: 16}}
                    data={[50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]}
                    svg={{stroke: 'rgb(134, 65, 244)'}}
                    contentInset={{top: 20, bottom: 20}}
                >
                    <Grid/>
                </LineChart>
            </View>

            <View style={{height: 200, padding: 20}}>
                <LineChart
                    style={{flex: 1}}
                    data={[50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]}
                    gridMin={0}
                    contentInset={{top: 10, bottom: 10}}
                    svg={{stroke: 'rgb(134, 65, 244)'}}
                >
                    <Grid/>
                </LineChart>
                <XAxis
                    style={{marginHorizontal: -10}}
                    data={[50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]}
                    formatLabel={(value, index) => index}
                    contentInset={{left: 10, right: 10}}
                    svg={{fontSize: 10, fill: 'black'}}
                />
            </View>
        </ScrollView>
    </SafeAreaView>;
};

export default ReactNativeSvgCharts;