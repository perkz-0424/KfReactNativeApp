import {NativeModules, Platform, DeviceEventEmitter} from "react-native";
import {EventEmitter} from 'events';

export interface Params {
    type: | "news" | "text" | "imageUrl" | "imageFile" | "imageResource" | "video" | "audio" | "file";
    thumbImage?: string;
    webpageUrl?: string;
    imageUrl?: string;
    videoUrl?: string;
    musicUrl?: string;
    filePath?: string;
    fileExtension?: string;
}

export interface ShareType extends Params {
    title?: string;
    description?: string;
}

export interface PayType {
    // 商家向财付通申请的商家id
    partnerId: string;
    // 预支付订单
    prepayId: string;
    // 随机串，防重发
    nonceStr: string;
    // 时间戳，防重发
    timeStamp: string;
    // 商家根据财付通文档填写的数据和签名
    package: string;
    // 商家根据微信开放平台文档对数据做的签名
    sign: string;
}

const {WeChat} = NativeModules;
const emitter = new EventEmitter();

DeviceEventEmitter.addListener('WeChat_Resp', resp => {
    emitter.emit(resp.type, resp);
});

const appidAndroid = 'wxb2c19858d7a4eb5a';
const appidIOS = 'wxb2c19858d7a4eb5a';

// 监听
export const addListener = emitter.addListener.bind(emitter);
export const once = emitter.once.bind(emitter);
export const removeAllListeners = emitter.removeAllListeners.bind(emitter);

// 注册微信android
export const registerApp = (appid: string) => {
    return new Promise((resolve, reject) => {
        WeChat.registerApp(appid, (e) => {
            if (!e) {
                resolve(e)
            } else {
                reject(e)
            }
        });
    });
}

// 注册微信ios
export const registerAppWithDescription = (appid: string, appdesc: string) => {
    return new Promise((resolve, reject) => {
        WeChat.registerAppWithDescription(appid, appdesc, (e) => {
            if (!e) {
                resolve(e)
            } else {
                reject(e)
            }
        });
    });
}

// 注册微信
if (Platform.OS === 'android') {
    registerApp(appidAndroid);
} else if (Platform.OS === 'ios') {
    registerAppWithDescription(appidIOS, '对APP的描述');
}

// 检查是否安装微信
export const isWXAppInstalled = () => {
    return new Promise((resolve, reject) => {
        WeChat.isWXAppInstalled((e) => {
            if (!e) {
                resolve(e)
            } else {
                reject(e)
            }
        });
    });
}

// 打开微信
export const openWXApp = () => {
    return new Promise((resolve, reject) => {
        WeChat.openWXApp((e) => {
            if (!e) {
                resolve(e)
            } else {
                reject(e)
            }
        });
    });
}

// 微信授权登陆
// scopes 应用授权作用域，如获取用户个人信息则填写snsapi_userinfo
// state 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验
export const sendAuthRequest = (scopes: string | string[], state?: string) => {
    return new Promise((resolve, reject) => {
        WeChat.sendAuthRequest(scopes, state, function () {

        });
        emitter.once('SendAuth.Resp', e => {
            if (e['errCode'] === 0) {
                resolve(e);
            } else {
                reject(e);
            }
        });
    });
}

// 分享到朋友圈
export const shareToTimeline = (data: ShareType) => {
    return new Promise((resolve, reject) => {
        WeChat.shareToTimeline(data, function () {

        });
        emitter.once('SendMessageToWX.Resp', e => {
            if (e['errCode'] === 0) {
                resolve(e);
            } else {
                reject(e);
            }
        });
    });
}

// 分享到人和群
export const shareToSession = (data: ShareType) => {
    return new Promise((resolve, reject) => {
        WeChat.shareToSession(data, function () {

        });
        emitter.once('SendMessageToWX.Resp', e => {
            if (e['errCode'] === 0) {
                resolve(e);
            } else {
                reject(e);
            }
        });
    });
}

// 收藏
export const shareToFavorite = (data: Params) => {
    return new Promise((resolve, reject) => {
        WeChat.shareToFavorite(data, function () {

        });
        emitter.once('SendMessageToWX.Resp', e => {
            if (e['errCode'] === 0) {
                resolve(e);
            } else {
                reject(e);
            }
        });
    });
}

// 微信支付
export const wxPay = (data: PayType) => {
    return new Promise((resolve, reject) => {
        WeChat.pay(data, (e) => {
            if (e) {
                reject(e)
            }
        });
        emitter.once('PayReq.Resp', e => {
            if (e['errCode'] === 0) {
                resolve(e);
            } else {
                reject(e);
            }
        });
    });
}

// 打开小程序
export const openMiniProgram = (id, path?) => {
    return new Promise((resolve, reject) => {
        WeChat.openMiniProgram({
            userName: id,
            path
        }, (e) => {
            if (!e) {
                resolve(e)
            } else {
                reject(e)
            }
        });
    });
}


const weChat = {
    registerApp,
    registerAppWithDescription,
    isWXAppInstalled,
    openWXApp,
    sendAuthRequest,
    shareToTimeline,
    shareToSession,
    wxPay,
    shareToFavorite,
    openMiniProgram,
    addListener,
    once,
    removeAllListeners
};


export default weChat;