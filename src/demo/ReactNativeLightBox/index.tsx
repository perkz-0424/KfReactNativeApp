import React from "react";
import {SafeAreaView, ScrollView, View} from "react-native";
import ImageLightBox from "../../components/ImageLightBox";


const ReactNativeLightBox = () => {
    React.useEffect(() => {

    }, []);
    return <SafeAreaView>
        <ScrollView>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <ImageLightBox
                    uri="https://assets.gongji58.com/2022-12-05/1088058-3maxl4eg741670209303.jpeg"
                    style={{height: 40}}
                />
                <ImageLightBox
                    uri="https://assets.gongji58.com/2022-12-05/1088058-3maxl4eg741670209303.jpeg"
                    style={{height: 100}}
                />
                <ImageLightBox
                    uri="https://assets.gongji58.com/2022-12-05/1088058-3maxl4eg741670209303.jpeg"
                    style={{height: 200}}
                />
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <ImageLightBox
                    uri="https://assets.gongji58.com/2022-12-05/1088058-3maxl4eg741670209303.jpeg"
                    style={{height: 200}}
                />
                <ImageLightBox
                    uri="https://assets.gongji58.com/2022-12-05/1088058-3maxl4eg741670209303.jpeg"
                    style={{height: 100}}
                />
                <ImageLightBox
                    uri="https://assets.gongji58.com/2022-12-05/1088058-3maxl4eg741670209303.jpeg"
                    style={{height: 40}}
                />

            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <ImageLightBox
                    uri="https://assets.gongji58.com/2022-12-05/1088058-3maxl4eg741670209303.jpeg"
                    style={{height: 40}}
                />
                <ImageLightBox
                    uri="https://assets.gongji58.com/2022-12-05/1088058-3maxl4eg741670209303.jpeg"
                    style={{height: 100}}
                />
                <ImageLightBox
                    uri="https://assets.gongji58.com/2022-12-05/1088058-3maxl4eg741670209303.jpeg"
                    style={{height: 200}}
                />
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <ImageLightBox
                    uri="https://assets.gongji58.com/2022-12-05/1088058-3maxl4eg741670209303.jpeg"
                    style={{height: 200}}
                />
                <ImageLightBox
                    uri="https://assets.gongji58.com/2022-12-05/1088058-3maxl4eg741670209303.jpeg"
                    style={{height: 100}}
                />
                <ImageLightBox
                    uri="https://assets.gongji58.com/2022-12-05/1088058-3maxl4eg741670209303.jpeg"
                    style={{height: 40}}
                />

            </View>
        </ScrollView>
    </SafeAreaView>;
};

export default ReactNativeLightBox;