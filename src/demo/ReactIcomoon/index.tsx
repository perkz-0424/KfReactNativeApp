import React from "react";
import {SafeAreaView, ScrollView} from "react-native";
import IcoMoon, {iconList} from "react-icomoon";
const iconSet = require('./selection.json');
import { Svg, Path } from 'react-native-svg';

const ReactIcoMoon = () => {
    React.useEffect(() => {

    }, []);
    return <SafeAreaView>
        <ScrollView>
            <IcoMoon
                native
                iconSet={iconSet}
                SvgComponent={Svg}
                PathComponent={Path}
                icon="heart"
                size={30}
                style={{ margin: 50, color: '#f40' }}
            />
        </ScrollView>
    </SafeAreaView>;
};

export default ReactIcoMoon;