const CryptoJS = require("crypto-js")

exports.excry =  async (req) => {
    return new Promise(function (resolve, reject){
        try{
            if(req){
                let aseKey = "JFPAlBigData2018";
                var iv  = CryptoJS.enc.Utf8.parse('2018JFPAlBigData');
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