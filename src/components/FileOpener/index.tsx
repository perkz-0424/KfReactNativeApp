import React from 'react'
import {NativeModules, Platform} from "react-native";
import RNFS from "react-native-fs";

const Opener = NativeModules.FileOpener;

interface OpenFileType {
    path: string;
    type: 'application/msword' | 'image/jpeg';
}

interface OpenType extends OpenFileType{
    method?: 'net' | 'local'
    fileName?: string;
}

class FileOpener {
    public open = (options: OpenType) => {
        return new Promise((resolve, reject) => {
            if (Opener) {
                if (options.method === 'local') {
                    this.openFileLocal({path: options.path, type: options.type})
                        .then(resolve)
                        .catch(reject);
                } else {
                    const localPath = `${Platform.OS === 'android' ? RNFS.ExternalDirectoryPath : RNFS.LibraryDirectoryPath}/${options.fileName}`;
                    RNFS.downloadFile({
                        fromUrl: options.path,
                        toFile: localPath,
                        background: true
                    }).promise.then(() => {
                        this.openFileLocal({path: localPath, type: options.type})
                            .then(resolve)
                            .catch(reject);
                    }).catch(reject);
                }
            } else {
                reject('打开失败')
            }
        })
    }

    private openFileLocal = (options: OpenFileType) => {
        if (Opener) {
            if (Platform.OS === 'android') {
                return Opener.open(options.path, options.type);
            } else if (Platform.OS === 'ios') {
                return Opener.open(options.path, options.type, '');
            } else {
                return new Promise((resolve, reject) => reject('打开失败'))
            }
        } else {
            return new Promise((resolve, reject) => reject('打开失败'))
        }
    }
}

const fileOpener = new FileOpener();


export default fileOpener;