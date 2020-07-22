const qr = require('qr-image');
const fs = require('fs');
const path = require('path');
const logUtil = require('../../utils/logUtil');
const config = require('../../config/serverConfig');
import {files} from '../modal/files';
import {collect} from '../modal/collect';
import mkdirs from '../../utils/mkdir';
import {project} from '../modal/project'
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
exports.getImage =  async (imagePath) => {
    console.log('imagePath', imagePath)
    try {
	    let targetPath = './';
        let filePath = path.join(targetPath, imagePath);
        console.log(filePath);
        return fs.readFileSync(filePath);
    } catch (err) {
        return errdata(null,'9999', err);
    }
}
exports.downFile = async (path) => {
    console.log('path', path)
    try {
        // 读取本地文件并返回文件流
	    // let targetPath = config.root+ '/uploads/test.json';
        // // let filePath = path.join(targetPath, '');
        // console.log(targetPath);
        // return fs.readFileSync(targetPath);

        // 读取数据库，返回文件流
        let allList = await project.find({});
        let writeResult = fs.writeFileSync(config.root+ '/uploads/project.json', JSON.stringify(allList));
        console.log('writeResult>>>>>>', writeResult);
        return fs.readFileSync(config.root+ '/uploads/project.json');
    } catch (err) {
        return errdata(null,'9999', err);
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
function getFileInfo(type, fileName) {
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
    if(extensionName==''){
        extensionName = fileName.split('.')[1]
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

    let targetInfo = getFileInfo(type, file.name);
    // console.log(targetInfo);
    mkdirs.mkdirsSync(targetInfo.targetPaths);
    let stream = fs.createWriteStream(targetInfo.resultPath);//创建一个可写流
    fs.createReadStream(tmpPath).pipe(stream);
    // let unlinkStatus = fs.unlinkSync(tmpPath);

    let dataArr = {
        fileName: targetInfo.targetName,
        filePath: targetInfo.relativePath,
        content: targetInfo.resultPath,
        userid: userid
    }
    try {
        let newFile = await files.create(dataArr);
        console.log(newFile);
        return resdata('0000', 'success', `${newFile.filePath}/${newFile.fileName}`);;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}
exports.fileList = async (reqBody, next) => {
  console.log(reqBody);

    let currentPage = parseInt(reqBody.current) || 1;
    let pageSize = parseInt(reqBody.pageSize)||10;
    let startNum =  (currentPage-1) * pageSize;

    let skip = {skip:startNum,limit:pageSize,sort:{"createTime":-1}};

    try {
        let allList = await files.find();
        let list = await files.find({},skip);
        for(let i=0; i<list.length; i++){
          let dataArr = {
              fileid: list[i]._id,
          }
          let collects = await collect.find(dataArr);
          list[i].collect=collects;
        }
        // console.log('allpage',allpage,parseInt(allpage),data.reqBody.numPerPage)
        let allPages = allList.length/pageSize;
        if(allPages>parseInt(allPages)){
            allPages=parseInt(allPages)+1
        }
        // console.log(allList, allList.length);
        let pageInfo = {
            pages: allPages,
            total: allList.length,
            currentPage: currentPage,
            pageSize: pageSize,
            allCount: allList.length,
            allPage: allPages,
            pageNumber: currentPage
        }
        let resp = {
          "records": list,
          "pageInfo":pageInfo
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
