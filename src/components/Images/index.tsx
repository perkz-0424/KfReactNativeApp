import React, {FC} from "react";
import {View, Image} from "react-native";
import Carousel from 'react-native-looped-carousel';

interface Props {
    images?: { uri: string }[];
    currentPage?: number;
    onAnimateNextPage?: (page: number) => void;
}

const Images: FC<Props> = (props) => {
    const [size, setSize] = React.useState<{ width?: number, height?: number }>({});
    React.useEffect(() => {

    }, []);
    return <View style={{width: '100%', height: '100%'}} onLayout={(e) => {
        const layout = e['nativeEvent'].layout;
        setSize({width: layout.width, height: layout.height});
    }}>
        <Carousel
            currentPage={props.currentPage}
            pageInfo={true}
            style={{...size}}
            autoplay={false}
            pageInfoBackgroundColor="rgba(255,255,255,0.5)"
            onAnimateNextPage={props.onAnimateNextPage}>
            {props.images!.map((i, index) => {
                return <View style={[size]} key={index}>
                    <Image
                        source={{uri: i.uri}}
                        resizeMode="contain"
                        style={{flex: 1, }}
                    />
                </View>
            })}
        </Carousel>
    </View>;
};

Images.defaultProps = {
    images: [],
    currentPage: 0,
}
export default Images;