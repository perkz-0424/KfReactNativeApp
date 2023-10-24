import React from "react";
import {SafeAreaView, ScrollView} from "react-native";
import Images from "../../components/Images";
import * as config from "../../config";

const ReactNativeLoopedCarousel = () => {
    React.useEffect(() => {

    }, []);
    return <SafeAreaView style={{flex: 1, backgroundColor: "#000"}}>
        <Images
            currentPage={0}
            images={config.images}
        />
    </SafeAreaView>;
};

export default ReactNativeLoopedCarousel;