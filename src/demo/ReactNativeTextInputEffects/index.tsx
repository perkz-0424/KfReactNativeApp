import React from "react";
import {SafeAreaView, ScrollView} from "react-native";
import {Fumi} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


const ReactNativeTextInputEffects = () => {
    const [value, setValue] = React.useState('');
    React.useEffect(() => {

    }, []);
    return <SafeAreaView>
        <ScrollView>
            <Fumi
                style={{backgroundColor: '#f9f5ed'}}
                label="账号"
                iconClass={FontAwesomeIcon}
                iconName="university"
                iconColor="#f95a25"
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
                onChangeText={setValue}
                value={value}
                keyboardType="number-pad"
                blurOnSubmit={true}
            />
        </ScrollView>
    </SafeAreaView>;
};

export default ReactNativeTextInputEffects;