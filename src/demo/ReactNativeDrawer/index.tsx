import React from "react";
import {ScrollView, Text, StyleSheet} from "react-native";
import Drawer from 'react-native-drawer';
import ReactNativeCalendars from "../ReactNativeCalendars";

const ReactNativeDrawer = () => {
    const drawerRef = React.useRef<Drawer>();
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState('');
    React.useEffect(() => {

    }, []);
    return <Drawer
        type="displace"
        ref={drawerRef}
        acceptDoubleTap={true}
        captureGestures={false}
        tweenDuration={100}
        panThreshold={0.08}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        openDrawerOffset={() => 90}
        panOpenMask={0.2}
        open={open}
        negotiatePan={true}
        content={<ScrollView style={styles.container}>
            <ReactNativeCalendars onSelect={(date) => {
                drawerRef.current!.close();
                setDate(date);
            }}/>
        </ScrollView>}
        styles={{drawer: styles.drawer, main: styles.main}}
        tweenHandler={(ratio) => ({
            main: {opacity: (2 - ratio) / 2}
        })}
    >
        <ScrollView style={[styles.container, {backgroundColor: '#FFF',}]}>
            <Text onPress={() => drawerRef.current!.open()}>{date || '选择日期'}</Text>
        </ScrollView>
    </Drawer>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    content: {
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },
    drawer: {shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 10},
    main: {paddingLeft: 3},
})

export default ReactNativeDrawer;