import React from "react";
import {View, Text, SafeAreaView, Button, Alert, ScrollView} from "react-native";
import weChat from "./components/WeChat";
import fileOpener from "./components/FileOpener";

const Main = () => {
    React.useEffect(() => {

    }, []);

    const alert = React.useCallback((message: string) => {
        Alert.alert('提示', message, [{
            text: "关闭",
            onPress: () => {
            },
            style: "cancel",
        }]);
    }, []);
    return <SafeAreaView>
        <ScrollView>
            <Text>
                打开文件和图片
            </Text>
            <View>
                <Button title="打开文件" onPress={() => {
                    fileOpener.open({
                        path: 'https://assets.gongji58.com/2023-02-16/20230216182726-1676543246.xls',
                        type: 'application/msword',
                        fileName: 'test.xls'
                    });
                }}/>
                <Button title="打开图片" onPress={() => {
                    fileOpener.open({
                        path: 'https://img.alicdn.com/imgextra/i3/6000000000290/O1CN01IOFfhl1E0rgcx0vbX_!!6000000000290-0-octopus.jpg',
                        type: "image/jpeg",
                        fileName: 'test.png'
                    });
                }}/>
            </View>
            <Text>
                微信
            </Text>
            <View>
                <Button title="打开微信" onPress={() => {
                    weChat.openWXApp().catch(() => {
                        alert('打开微信失败');
                    });
                }}/>
                <Button title="检查是否安装微信" onPress={() => {
                    weChat.isWXAppInstalled().then(() => {
                        alert('已安装微信');
                    }).catch(() => {
                        alert('未安装微信');
                    });
                }}/>
                <Button title="微信授权登陆" onPress={() => {

                }}/>
                <Button title="打开小程序" onPress={() => {
                    weChat.openMiniProgram(
                        'wx0a9f3a98445182a2',
                        // '/pages/index/index'
                    ).catch((e) => {
                        console.log(e)
                    })
                }}/>
                <Button title="微信分享到朋友圈" onPress={() => {
                    weChat.shareToTimeline({
                        type: "news",
                        title: "百度一下",
                        webpageUrl: 'http://www.baidu.com'
                    }).catch(() => {

                    });
                }}/>
                <Button title="微信分享给朋友" onPress={() => {
                    weChat.shareToSession({
                        type: "news",
                        title: "百度一下",
                        webpageUrl: 'http://www.baidu.com'
                    }).catch(() => {

                    });
                }}/>
                <Button title="收藏到微信" onPress={() => {
                    weChat.shareToFavorite({
                        type: "news",
                        webpageUrl: 'http://www.baidu.com'
                    }).catch(() => {

                    });
                }}/>
                <Button title="微信支付" onPress={() => {

                }}/>
            </View>
        </ScrollView>
    </SafeAreaView>;
};

export default Main;