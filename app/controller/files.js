const qr = require('qr-image');
const fs = require('fs');
const path = require('path');
const logUtil = require('../../utils/logUtil');
const config = require('../../config/serverConfig');
import {files} from '../modal/files'
import mkdirs from '../../utils/mkdir';

exports.createQrcode = async (Text) => {
    try {
        let img = qr.imageSync(Text);
        return img;
    } catch (err) {
        throw new Error(err);
        let respon = {
            code: '9999',
            message: 'error',
            data: err
        }
        return respon;
    }
}
exports.readFile =  async (id) => {
    try {
        let list = await files.find({_id: id});
        console.log(list)
        if(list && list.length > 0) {
            return fs.readFileSync(list[0].content);   
        } else {
            return {
                code: '9999',
                message: 'can not find file',
            }
        }
    } catch (err) {
        let respon = {
            code: '9999',
            message: 'error',
            data: err
        }
        return respon;
    }
}
function getFileInfo(type) {
    let uploadPath = config.root+ '/uploads/';
    let extensionName = "";
    //判断文件类型
    switch (type) {
        case 'image/pjpeg':extensionName = 'jpg';
            break;
        case 'image/jpeg':extensionName = 'jpg';
            break;
        case 'image/gif':extensionName = 'gif';
            break;
        case 'image/png':extensionName = 'png';
            break;
        case 'image/x-png':extensionName = 'png';
            break;
        case 'image/bmp':extensionName = 'bmp';
            break;
        case 'application/zip':extensionName='zip';
        break;
    }
    let theData = new Date();
    let timeName = (Date.parse(new Date())/1000) + '' + (Math.round(Math.random()*9999));
    let targetPaths = theData.getFullYear() + '-' + ( theData.getMonth()+1) + '-' + theData.getDate();
    let relativePath = '/uploads/' + targetPaths;
    targetPaths = uploadPath + targetPaths;
    let targetName = timeName + '.' + extensionName;
    let resultPath = targetPaths + '/'+ targetName;
    return {targetName: targetName,targetPaths: targetPaths, resultPath: resultPath, relativePath: relativePath}
}
exports.fileUp = async (file) => {
    let tmpPath = file.path;
    let type = file.type;
    
    let targetInfo = getFileInfo(type);
    // console.log(targetInfo);
    mkdirs.mkdirsSync(targetInfo.targetPaths);
    let stream = fs.createWriteStream(targetInfo.resultPath);//创建一个可写流  
    fs.createReadStream(tmpPath).pipe(stream);
    let unlinkStatus = fs.unlinkSync(tmpPath);

    let dataArr = {
        fileName: targetInfo.targetName,
        filePath: targetInfo.relativePath,
        content: targetInfo.resultPath,
    }
    try {
        let newFile = await files.create(dataArr);
        console.log(newFile);
        let respon = {
            code: '0000',
            message: 'success',
            data: newFile
        }
        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        let respon = {
            code: '9999',
            message: 'error',
            data: err
        }
        return respon;
    }
}
exports.fileList = async (ctx, next) => { 
    try {
        let list = await files.find();
        let respon = {
            code: '0000',
            message: 'success',
            data: list
        }
        return respon;
    } catch (err) {
        let respon = {
            code: '9999',
            message: 'error',
            data: err
        }
        return respon;
    }
}
exports.removeFile = async (reqBody) => {
    let dataArr = {
        id: reqBody.id,
    }
    try {
        let list = await files.find({_id: reqBody.id});
        let respon = {
            code: '0000',
            message: '',
        }
        if(list && list.length > 0) {
            let unlinkStatus = fs.unlinkSync(list[0].content);
            let deletes = await files.delete(dataArr);
            respon.data = deletes
            respon.message = 'success'
        }else {
            respon.message = 'the id is not exicet'
            respon.data = list
        }
        return respon;
    } catch (err) {
        throw new Error(err);
        let respon = {
            code: '9999',
            message: 'error',
            data: err
        }
        return respon;
    }
}
