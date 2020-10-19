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

function resetStr(arr){
    if(arr[1]){
        arr[1] = arr[1].replace(/\t+/g,'')
        arr[1] = arr[1].split(/\n/);
    }
    if(arr.length==1){
        return arr[0]
    }
    return arr
}

function replaceStr(arr){
    if(arr[1]){
        arr[1] = arr[1].replace(/\t+/g,'')
        arr[1] = arr[1].replace(/\n/g,'')
        // arr[1] = arr[1].replace(/\"/,'')
    }
    if(arr.length==1){
        return arr[0]
    }
    return arr
}

function checkInArr(arr, str){
    let status=false;
    let key = '';
    let type = ''
    for(let i=0;i<arr.length;i++){
        if(str.includes(arr[i].text)){
            status =  true;
            key = arr[i].key
            if(arr[i].type){
                type = arr[i].type
            }
            break;
        }
    }
    return {status, key, type: type};
}

function resetTable(arr, labelArr){
    let resultArr = []
    for(let i=2; i<arr.length;i++){
        arr[i] = arr[i].replace(/\s/g,'');
        let itemArr = arr[i].split('|');
        itemArr.pop()
        itemArr.shift()
        let items = {}
        for(let j=0;j<labelArr.length;j++){
            items[labelArr[j].key] = itemArr[j];
        }
        resultArr.push(items)
    }
    return resultArr;
}

function setArrToYapiJson(arr){
    let resObg = {
        type: 'object',
        title: 'empty object',
        properties: {},
        required: []
    }
    let requiredArr = []
    for(let i=0; i < arr.length; i++){
        resObg.properties[arr[i].name] = {
            type: arr[i].type,
            chinaName: arr[i].description,
            description: arr[i].demo,
            maxLength: arr[i].maxLength,
        }
        if(arr[i].require=='是'){
            requiredArr.push(arr[i].name)
        }
    }
    resObg.required = requiredArr;
    return resObg;
}

exports.importFile = async (path) => {
    console.log('path', path)
    try {
        let Obg = {}
        // 读取本地文件并返回文件流
	    let targetPath = config.root+ '/uploads/test.md';
        // let filePath = path.join(targetPath, '');
        // console.log(targetPath);
        let fileStr = fs.readFileSync(targetPath, 'utf8').toString();
        let project = fileStr.match(/#.*?#/);
        let title = fileStr.match(/##.*?##/);
        project[0] = project[0].replace(/(#|\*|\s)/g,'');
        title[0] = title[0].replace(/(#|\*|\s)/g,'');

        Obg.project = project[0];
        Obg.title = title[0];

        fileStr = fileStr.replace(project[0],'');
        fileStr = fileStr.replace(title[0],'');

        let result = fileStr.split(/######/);
        let configKey = [{text: '接口功能描述', key: 'remark'}, {text: '支持格式', key: 'req_body_type'}, 
        {text: 'HTTP请求方式', key: 'method'}, { text: '编码格式', key: 'codeType'}, {text: 'URL', key: 'path'},
        {text: '版本', key: 'version'}];
        let keyWords = [{ text: '请求示例', key: 'req_markdown'}, {text:'响应示例', key: 'res_markdown'}, {text: '异常示例', key: 'res_desc'}];
        let tableKey= [{text: '请求地址', key: 'environmental', type: 'envKey'}, {text: '公共请求参数', key: 'com_req_body', type: 'paramesKey'},{text: '请求参数', key: 'req_body_other', type: 'paramesKey'},
        {text: '公共响应参数', key: 'com_res_body', type: 'paramesKey'},{text: '响应参数', key: 'res_body', type: 'paramesKey'},{text: '公共响应码', key: 'com_code', type: 'codeKey'},{text: '业务响应码', key: 'code_querys', type: 'codeKey'}]
        

        let tableType = {
            envKey: [{ text: '环境', key: 'envName'},{ text: '访问地址', key: 'host'},{ text: '完整地址', key: 'path'}],
            paramesKey : [{ text: '参数', key: 'name'},{ text: '类型', key: 'type'},{ text: '是否必填', key: 'require'},{ text: '最大长度', key: 'maxLength'},{ text: '描述', key: 'description'},{ text: '示例值', key: 'demo'}],
            codeKey : [{ text: '错误码', key: 'codeName'},{ text: '返回内容', key: 'responContent'},{ text: '错误描述', key: 'remark'},{ text: '解决方案', key: 'soluton'}]
        }

        for(let i=0;i<result.length;i++){
            let configStatus = checkInArr(configKey,result[i]);
            let keyWordStatus = checkInArr(keyWords,result[i]);
            let tableKeyStatus = checkInArr(tableKey,result[i]);
            // 基础配置
            if(configStatus.status){
                result[i] = result[i].split(/\n+/)
                result[i][1] = result[i][1].replace(/(>|\s)/g,'')
                Obg[configStatus.key] = result[i][1]
            }else if(tableKeyStatus.status){
                result[i] = result[i].split(/\n\n/)
                result[i] = resetStr(result[i]);
                Obg[tableKeyStatus.key] = resetTable(result[i][1], tableType[tableKeyStatus.type]);

                // Obg[tableKeyStatus.key] = result[i][1];
            }else if(keyWordStatus.status){
                // JSON文本
                result[i] = result[i].split(/\n\n/)
                result[i] = replaceStr(result[i])
                Obg[keyWordStatus.key] = result[i][1]
            }else{
                result[i] = result[i].split(/\n\n/)
                result[i] = resetStr(result[i])
            } 
        }
        Obg.req_body_other = setArrToYapiJson(Obg.com_req_body.concat(Obg.req_body_other));
        Obg.res_body = setArrToYapiJson(Obg.com_res_body.concat(Obg.res_body));
        console.log('Obg', Obg)
        return Obg;
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
