import React, {FC} from "react";
import {SafeAreaView, ScrollView} from "react-native";
import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig['locales'][''] = {
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    dayNames: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
    dayNamesShort: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
    amDesignator: '上午',
    pmDesignator: '下午'
}

interface Props {
    onSelect?: (date: string) => void
}
const ReactNativeCalendars:FC<Props> = (props) => {
    const [selected, setSelected] = React.useState('');
    React.useEffect(() => {

    }, []);
    return <SafeAreaView>
        <ScrollView>
            <Calendar
                onDayPress={(day) => {
                    // setSelected(day.dateString);
                }}
                onDayLongPress={(day) => {
                    setSelected(day.dateString);
                    props.onSelect && props.onSelect(day.dateString)
                }}
                style={{height: 350}}
                markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                }}
            />
        </ScrollView>
    </SafeAreaView>;
};

export default ReactNativeCalendars;