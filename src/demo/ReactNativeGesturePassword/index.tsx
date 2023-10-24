import React from "react";
import {SafeAreaView, ScrollView} from "react-native";
import GesturePassword from "../../components/GesturePassword";


const ReactNativeGesturePassword = () => {
    const [status, setStatus] = React.useState('normal');
    const [message, setMessage] = React.useState('请输入密码');
    const refPassword = React.useRef<GesturePassword>();

    React.useEffect(() => {

    }, []);

    const onStart = () => {

    }

    const onEnd = (password: string) => {
        refPassword.current!.resetActive();
    }
    return <SafeAreaView>
        <GesturePassword
            ref={(e) => refPassword.current = e}
            status={status}
            message={message}
            onStart={() => onStart()}
            onEnd={(password) => onEnd(password)}
            innerCircle={true}
            outerCircle={true}
        />
    </SafeAreaView>;
};

export default ReactNativeGesturePassword;