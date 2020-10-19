const CryptoJS = require("crypto-js")
const encodekey = 'JFPAlBigData2018';
const ivKey = '2018JFPAlBigData';

exports.dxcry = (encData) => {
    return new Promise(function (resolve, reject) {
        try {
            console.log('CryptoJS',encodekey);
        let aseKey = CryptoJS.enc.Utf8.parse(encodekey)     //秘钥必须为：8/16/32位
        var iv = CryptoJS.enc.Utf8.parse(ivKey);
        //加密
        let reqData = JSON.stringify(encData);
        console.log('reqData',reqData);
        let encrypt = CryptoJS.AES.encrypt(reqData, aseKey, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();

        console.log(encrypt);
        resolve(encrypt);
    }catch (err){
        reject(err);
    }
  })
}
exports.excry = (req) => {
    return new Promise(function (resolve, reject){
        try{
            if(req){
                let aseKey = encodekey;
                var iv  = CryptoJS.enc.Utf8.parse(ivKey);
                let decrypt = CryptoJS.AES.decrypt(req, CryptoJS.enc.Utf8.parse(aseKey), {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(CryptoJS.enc.Utf8);
                console.log('decrypt:', decrypt);
                decrypt = JSON.parse(decrypt)
                resolve(decrypt);
            }else{
                reject('systom err');
            }
            
        }catch (err){
            reject(err);
        }
        
    })
}