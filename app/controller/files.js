const qr = require('qr-image');
const fs = require('fs');
const path = require('path');
const logUtil = require('../../utils/logUtil');
const config = require('../../config/serverConfig');
import {files} from '../modal/files'
import mkdirs from '../../utils/mkdir';
import {resdata, errdata} from '../../utils/serve'

exports.createQrcode = async (Text) => {
    try {
        let img = qr.imageSync(Text);
        return img;
    } catch (err) {
        throw new Error(err);
        return errdata(err);
    }
}
exports.readFile =  async (id) => {
    try {
        let list = await files.find({_id: id});
        console.log(list)
        if(list && list.length > 0) {
            return fs.readFileSync(list[0].content);
        } else {
            return errdata(null,'9999', 'can not find file')
        }
    } catch (err) {
        return errdata(err);
    }
}
exports.fileDetail =  async (id) => {
    try {
        let list = await files.find({_id: id});
        console.log(list)
        let resp = {
          "data": list,
        }
        return resdata('0000', 'success', resp);
    } catch (err) {
        throw new Error(err);
        return errdata(err);
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
exports.fileUp = async (file, userid) => {
    console.log(file)
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
        userid: userid
    }
    try {
        let newFile = await files.create(dataArr);
        console.log(newFile);
        return resdata('0000', 'success', newFile);;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}
exports.fileList = async (reqBody, next) => {
  console.log(reqBody);
    let pageindex=(reqBody.pageNum-1)*reqBody.numPerPage;
    if(reqBody.pageNum==1){
      pageindex=0;//o biegin
    }
    let limit=parseInt(reqBody.numPerPage,10);
    const where = {skip:pageindex,limit:limit,sort:{"createTime":-1}}
    try {
        let lists = await files.find();
        let list = await files.find({},where);
        let allpage=lists.length/reqBody.numPerPage
        // console.log('allpage',allpage,parseInt(allpage),data.reqBody.numPerPage)
        if(allpage>parseInt(allpage, 10)){
          allpage=parseInt(allpage, 10)+1
        }
        let resp = {
          "data": list,
          "page":{
    				"totalRecord": lists.length,
            "pageIndex": parseInt(reqBody.pageNum,10),
            "pageNum": limit,
            "allpage": allpage
    			}
        }
        return resdata('0000', 'success', resp);
    } catch (err) {
        throw new Error(err);
        return errdata(err);
    }
}
exports.removeFile = async (reqBody) => {
    let dataArr = {
        id: reqBody.id,
    }
    try {
        let list = await files.find({_id: reqBody.id});
        let respon = {}
        if(list && list.length > 0) {
            let unlinkStatus = fs.unlinkSync(list[0].content);
            let deletes = await files.delete(dataArr);
            respon = resdata('0000', 'success', deletes);
        }else {
            respon = resdata('0000', 'the id is not exicet', list);
        }
        return respon;
    } catch (err) {
        throw new Error(err);
        return errdata(err);
    }
}
