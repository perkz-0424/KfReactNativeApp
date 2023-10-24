import React from "react";
import {Button, SafeAreaView, Text} from "react-native";
import ProgressBar from "../../components/ProgressBar"


let timer: any = null;
let number = 0;
const update = (callback: (n: number) => void) => {
    timer && clearInterval(timer);
    number = 0;
    timer = setInterval(() => {
        const newNumber = number + 0.1;
        number = newNumber;
        if (number >= 1) {
            clearInterval(timer);
        } else {
            callback(newNumber);
        }
    }, 500);
}

const ReactNativeProgressBar = () => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {

    }, []);

    return <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Button title="开始" onPress={() => {
            setProgress(0);
            update((n) => {
                setProgress(Number(Math.round(n * 10).toFixed(2)) / 10);
            });
        }}/>
        <Text>完成程度{progress * 100}%</Text>
        <ProgressBar
            fillStyle={{}}
            backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
            style={{marginTop: 10, width: 300}}
            progress={progress}
        />
    </SafeAreaView>;
};


export default ReactNativeProgressBar;