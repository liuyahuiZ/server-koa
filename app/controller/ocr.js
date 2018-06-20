const fs = require('fs');
const filUtil = require('../../utils/file');
const crypto = require('crypto-js');
const FormData = require('form-data');

import mkdirs from '../../utils/mkdir';
import request from 'request';
import {files} from '../modal/files';
import {resdata, errdata} from '../../utils/serve';

global.idUrl = 'https://v2-auth-api.visioncloudapi.com/ocr/idcard/stateless';
global.silentUrl = 'https://v2-auth-api.visioncloudapi.com/identity/silent_idnumber_verification/stateless';

function authorize() {
    var signatureArray = []
    var timeStamp = Date.now()
    var nonce = (Math.random().toString(36).substr(2))
    var apiId = '3c70c9db224d444a91bb6e5dc9b7e6f7'
    var apiSecret = 'da02efa52e994146bbf0b0989c63d496'
    signatureArray.push(timeStamp, nonce, apiId)
    var signatureString = signatureArray.sort().join('')
    var hmac = crypto.HmacSHA256(signatureString, apiSecret)
    var authorization = 'key=' + apiId + ',timestamp=' + timeStamp + ',nonce=' + nonce + ',signature=' + hmac
    return authorization
}

function reqIdFount(filePath, faceType){
    // console.log(filePath);
    return new Promise(function (resolve, reject){
        let formData = new FormData();
        let imageFile = fs.createReadStream(filePath);
    
        formData = {
            'image_file': imageFile,
            'side': faceType || 'auto'
        };
        request.post({
            headers: {
              'Authorization': authorize()
            },
            url: global.idUrl,
            formData: formData
          }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body) // Show the HTML for the baidu homepage.
                resolve(body);
            } else {
                reject(error);
            }
          })
      })
}

async function whiteFile(file){
    return new Promise(function (resolve, reject){
        let tmpPath = file.path;
        let type = file.type;
        // let fontType = type;

        let targetInfo = filUtil.getFileInfo(type);
        // console.log(targetInfo);
        mkdirs.mkdirsSync(targetInfo.targetPaths);
        let stream = fs.createWriteStream(targetInfo.resultPath);//创建一个可写流
        let status = fs.createReadStream(tmpPath).pipe(stream).on('close', ()=>{
        let unlinkStatus = fs.unlinkSync(tmpPath);
            // console.log('status:', unlinkStatus);
            resolve(targetInfo);
        });
    })
}

async function reqLive(filePath, info){
    return new Promise(function (resolve, reject){
        let formData = new FormData();
        let videoFile = fs.createReadStream(filePath);
    
        formData = {
            'video_file': videoFile,
            'name': info.name,
            'idnumber': info.idnumber,
            'return_image': info.return_image
        };
        request.post({
            headers: {
              'Authorization': authorize()
            },
            url: global.silentUrl,
            formData: formData
          }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body) // Show the HTML for the baidu homepage.
                resolve(body);
            } else {
                reject(error);
            }
          })
      })
}

exports.idFount = async (file, faceType) => {
    // console.log(file, faceType)
    try {
        // let newFile = await files.create(dataArr);
        // console.log(newFile);
        let whiteRes =  await whiteFile(file);
        console.log(whiteRes);
        let reqResult = await reqIdFount(whiteRes.newRelativePath, faceType);
        console.log(reqResult);
        return resdata('0000', 'success', reqResult);
    } catch (err) {
        console.log(err)
        throw new Error(err);
    }
}

exports.live = async (file, info) => {
    // console.log(file, info)
    try {
        // let newFile = await files.create(dataArr);
        // console.log(newFile);
        let whiteRes =  await whiteFile(file);
        // console.log(whiteRes);
        let reqResult = await reqLive(whiteRes.newRelativePath, info);
        // console.log(reqResult);
        return resdata('0000', 'success', reqResult);
    } catch (err) {
        console.log(err)
        throw new Error(err);
    }
}