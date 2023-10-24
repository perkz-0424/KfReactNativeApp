import React from "react";
import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


const ReactNativeActionButton = () => {
    React.useEffect(() => {

    }, []);
    return <SafeAreaView style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <ScrollView>

        </ScrollView>
        <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item buttonColor='#9b59b6' title="新任务" onPress={() => {}}>
                <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="新消息" onPress={() => {}}>
                <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' title="新问题" onPress={() => {}}>
                <Icon name="md-done-all" style={styles.actionButtonIcon} />
            </ActionButton.Item>
        </ActionButton>
    </SafeAreaView>;
};

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

export default ReactNativeActionButton;