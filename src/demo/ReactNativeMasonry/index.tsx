import React from "react";
import {SafeAreaView} from "react-native";
import Masonry from "../../components/Masonry";
import * as config from "../../config";


const ReactNativeMasonry = () => {
    React.useEffect(() => {

    }, []);
    return <SafeAreaView style={{flex: 1}}>
        <Masonry
            columns={2}
            bricks={config.images}
        />
    </SafeAreaView>;
};

export default ReactNativeMasonry;