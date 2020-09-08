const config = require('../../config/serverConfig');
const fs = require('fs');
import {project} from '../modal/project'
import {pages} from '../modal/pages'
import {role} from '../modal/role'
import {pageConfig} from '../modal/pageConfig'
import {resdata, errdata} from '../../utils/serve'

exports.projectList = async (reqBody) => {
    let dataArr = {
        isDelete: {"$ne" : 1}
    }
    let currentPage = parseInt(reqBody.current) || 1;
    let pageSize = parseInt(reqBody.size)||10;
    let startNum =  (currentPage-1) * pageSize;
    
    let skip = {skip:startNum,limit:pageSize,sort:{"createTime":-1}};
    try {
        let allList = await project.find(dataArr);
        let allPages = allList.length/pageSize;
        if(allPages>parseInt(allPages)){
            allPages=parseInt(allPages)+1
        }
        // console.log(allList, allList.length);
        let pageInfo = {
            allPage: allPages,
            allCount: allList.length,
            currentPage: currentPage,
            pageSize: pageSize,
        }
        if(currentPage>allPages) {
            return resdata('0000', 'no more', {pageInfo: pageInfo});
        }
        let list = await project.find(dataArr, skip);
        return resdata('0000', 'success', list);
    } catch (err) {
        console.log('err',err)
        return errdata(err);
    }
}

function checkData(item, checkData){
    let status = false;
    let pages = []
    for(let i=0;i<checkData.length;i++){
        if(checkData[i].projectId==item){
            status = true;
            pages = checkData[i].pageId.split(',')
            break;
        }
    }
    return {status: status, pages: pages};
}

function checkChildren(pageArr, menu){
    let newArr = []
    for(let i=0;i<menu.length;i++){
        console.log('menu[i]', menu[i]._id.toString())
        if(pageArr.includes(menu[i]._id.toString())){
            newArr.push(menu[i])
        }
    }
    return newArr;
}

exports.projectMenu = async (reqBody, next) => {
    try {
        let list = await project.find({}, {});
        let where = {
            roleCode: reqBody.role
        }
        let roles = await role.find(where);
        console.log('roles', roles[0].menuGroup);
        let newList = []
        for(let i=0; i<list.length; i++){
            let result = checkData(list[i]._id, roles[0].menuGroup)
            console.log('result', result)
            if(result.status){
            let dataArr = {
                projectId: list[i]._id,
            }
          let pagesList = await pages.find(dataArr, {});
          pagesList = checkChildren(result.pages, pagesList)
        //   console.log('pagesList', pagesList);
        //   newList[i] = list[i];
            newList.push({ _id: list[i]._id, 
            title: list[i].title,
            describe: list[i].describe,
            projectIcon: list[i].projectIcon,
            info: list[i],
            children: pagesList});
            
            }
        }
        return resdata('0000', 'success', newList);
    } catch (err) {
        console.log('err',err)
        return errdata(err);
    }
}

exports.allProject = async (reqBody, next) => {
    try {
        let reqData = {}
        if(reqBody&&reqBody._id){
            reqData = {
                _id: reqBody._id
            }
        }
        let list = await project.find(reqData, {});
        let newList = []
        for(let i=0; i<list.length; i++){
            let dataArr = {
                projectId: list[i]._id,
            }
            let pagesList = await pages.find(dataArr, {});
        //   console.log('pagesList', pagesList);
        //   newList[i] = list[i];
            newList.push({ _id: list[i]._id, 
            title: list[i].title,
            describe: list[i].describe,
            projectIcon: list[i].projectIcon,
            info: list[i],
            children: pagesList});
        }
        return resdata('0000', 'success', newList);
    } catch (err) {
        console.log('err',err)
        return errdata(err);
    }
}

exports.downLoadAllProject = async (reqBody, next) => {
    try {
        let reqData = {}
        if(reqBody&&reqBody._id){
            reqData = {
                _id: reqBody._id
            }
        }
        console.log('reqData', reqData)
        let list = await project.find(reqData, {});
        let newList = []
        for(let i=0; i<list.length; i++){
            let dataArr = {
                projectId: list[i]._id,
            }
            let pagesList = await pages.find(dataArr, {});
            let newPages = []
            for(let j=0; j<pagesList.length; j++){
                console.log('configId', pagesList[j].configId)
                let configJson = {}
                if(pagesList[j].configId){
                    configJson = await pageConfig.findOne({_id: pagesList[j].configId});
                } 
                newPages.push({
                    _id: pagesList[j]._id, 
                    configJson: configJson,
                    configId: pagesList[j].configId,
                    createTime: pagesList[j].createTime,
                    describe: pagesList[j].describe,
                    feature: pagesList[j].feature,
                    pageIcon: pagesList[j].pageIcon,
                    projectId: pagesList[j].projectId,
                    status: pagesList[j].status,
                    templateId: pagesList[j].templateId,
                    title: pagesList[j].title,
                    updateTime: pagesList[j].updateTime,
                    url: pagesList[j].url,
                    weight: pagesList[j].weight
                })
            }
        //   console.log('pagesList', pagesList);
        //   newList[i] = list[i];
            newList.push({ _id: list[i]._id, 
            title: list[i].title,
            describe: list[i].describe,
            projectIcon: list[i].projectIcon,
            info: list[i],
            children: newPages});
        }
        let writeResult = fs.writeFileSync(config.root+ '/uploads/allproject.json', JSON.stringify(newList));
        console.log('writeResult>>>>>>', writeResult);
        return fs.readFileSync(config.root+ '/uploads/allproject.json');

        // return resdata('0000', 'success', newList);
    } catch (err) {
        console.log('err',err)
        return errdata(err);
    }
}

function checkInArr(arr, key, value){
    console.log('arr',arr,key,value)
    let status = false;
    for(let i=0;i<arr.length;i++){
        console.log(arr[i][key], value, arr[i][key]== value)
        if(arr[i][key]== value) {
            status = true
        }
    }
    return status
}

exports.downLoadProject = async (reqBody, next) => {
    try {
        let reqData = {}
        if(reqBody&&reqBody._id){
            reqData = {
                _id: reqBody._id
            }
        }else{
            return errdata('9999', 'error, id is null', 'error, id is null');
        }
        let list = await project.findOne(reqData, {});
        let dataArr = {
            projectId: list._id,
        }
        let pagesList = await pages.find(dataArr, {});
        console.log('pagesList')
        let newPages = []
        for(let j=0; j<pagesList.length; j++){
            let status = checkInArr(reqBody.pages, 'value', pagesList[j]._id.toString())
            if(status==false) continue;

            console.log('configId', pagesList[j].configId)
            let configJson = {}
            if(pagesList[j].configId){
                configJson = await pageConfig.findOne({_id: pagesList[j].configId});
            } 
            newPages.push({
                _id: pagesList[j]._id, 
                configJson: configJson,
                configId: pagesList[j].configId,
                createTime: pagesList[j].createTime,
                describe: pagesList[j].describe,
                feature: pagesList[j].feature,
                pageIcon: pagesList[j].pageIcon,
                projectId: pagesList[j].projectId,
                status: pagesList[j].status,
                templateId: pagesList[j].templateId,
                title: pagesList[j].title,
                updateTime: pagesList[j].updateTime,
                url: pagesList[j].url,
                weight: pagesList[j].weight
            })
        }
        let newObg = { _id: list._id, 
            title: list.title,
            describe: list.describe,
            projectIcon: list.projectIcon,
            info: list,
            children: newPages
        }
        
        let writeResult = fs.writeFileSync(config.root+ '/uploads/pages.json', JSON.stringify(newObg));
        console.log('writeResult>>>>>>', writeResult);
        return fs.readFileSync(config.root+ '/uploads/pages.json');

        // return resdata('0000', 'success', newList);
    } catch (err) {
        console.log('err',err)
        return errdata(err);
    }
}
async function createPages(allPages, project){
    if(allPages&&allPages.length>0) { 
        try{
            for(let i=0;i<allPages.length;i++){
                let dataArr = {
                    title: allPages[i].title,
                    describe: allPages[i].describe,
                    url: allPages[i].url,
                    projectId: project._id,
                    templateId: allPages[i].templateId,
                    isDIYPage: allPages[i].isDIYPage,
                    pageIcon: allPages[i].pageIcon,
                    weight: allPages[i].weight,
                    status: allPages[i].status,
                    feature: allPages[i].feature
                }
                let newUser = await pages.create(dataArr);
                console.log('newUser', newUser._id.toString());
                let config = allPages[i].configJson;
                let configData = {
                    pageId: newUser._id.toString(),
                    configJson: config.configJson,
                    status: 0,
                    configVersion: config.configVersion,
                }
                let newConfig = await pageConfig.create(configData);
                console.log('newConfig', newConfig._id.toString());
            }
        } catch(err){
            console.log('err', err);
        }
    }
}

async function updatePages(allPages, project){
    if(allPages&&allPages.length>0) { 
        try{
            for(let i=0;i<allPages.length;i++){
                let dataArr = {
                    title: allPages[i].title,
                    describe: allPages[i].describe,
                    url: allPages[i].url,
                    projectId: project._id,
                    templateId: allPages[i].templateId,
                    isDIYPage: allPages[i].isDIYPage,
                    pageIcon: allPages[i].pageIcon,
                    weight: allPages[i].weight,
                    status: allPages[i].status,
                    feature: allPages[i].feature
                }
                
                let newUser = {};
                let oldPages = await pages.findOne({title: allPages[i].title, projectId: project._id});
                if(oldPages&&oldPages._id){
                    // newUser = await pages.update({_id: pages._id}, dataArr);
                    console.log('oldUser', oldPages, oldPages._id.toString());
                    newUser = oldPages
                } else{
                    newUser = await pages.create(dataArr);
                    console.log('newUser', newUser._id.toString());
                }
                
                let config = allPages[i].configJson;
                let configData = {
                    pageId: newUser._id.toString(),
                    configJson: config.configJson,
                    status: 0,
                    configVersion: config.configVersion,
                }
                console.log('configData', configData);
                let newConfig = await pageConfig.create(configData);
                console.log('newConfig', newConfig._id.toString());
            }
        } catch(err){
            console.log('err', err);
        }
    }
}
exports.importProject = async (reqBody) => {
    // console.log(reqBody.id);
    try {
        let configJson = fs.readFileSync(config.root + reqBody.fileLink);
        // console.log('configJson', configJson.toString());
        let projects = configJson.toString();
        if(!projects){
            return errdata( 'err', '9999', '没有找到对应配置文件',);
        }
        projects = JSON.parse(projects);
        let result = '';
        for(let i=0;i<projects.length;i++){
           result =  await createPages(projects[i].children, reqBody.pageInfo)
        }
        return resdata('0000', 'success', result);
    } catch (err) {
        console.log(err)
        return errdata(err);
    }
}

exports.importPageConfig = async (reqBody) => {
    // console.log(reqBody.id);
    try {
        let configJson = fs.readFileSync(config.root + reqBody.fileLink);
        // console.log('configJson', configJson.toString());
        let projects = configJson.toString();
        if(!projects){
            return errdata( 'err', '9999', '没有找到对应配置文件',);
        }
        projects = JSON.parse(projects);
        let result = await updatePages(projects.children, reqBody.pageInfo)
        return resdata('0000', 'success', result);
    } catch (err) {
        console.log(err)
        return errdata(err);
    }
}


exports.projectDetail = async (reqBody) => {
    // console.log(reqBody.id);
    try {
        let list = await project.findOne({_id: reqBody.id});
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}

exports.createProject = async (reqBody) => {
    let dataArr = {
        createUserId: reqBody.userId,
        title: reqBody.title,
        describe: reqBody.describe,
        parentId: reqBody.parentId,
        channelId: reqBody.channelId,
        projectIcon: reqBody.projectIcon,
        weight: reqBody.weight,
        feature: reqBody.feature,
        isDelete: 0
    }
    try {
        let newUser = await project.create(dataArr);
            console.log('newUser', newUser);
        let respon = resdata('0000', 'success', newUser);
        console.log(respon);
        return respon;
    } catch (err) {
        console.log('err', err)
        throw new Error(err);
        return errdata(err);
    }
}

exports.updateProject = async (reqBody) => {
    let dataArr = {
        title: reqBody.title,
        describe: reqBody.describe,
        parentId: reqBody.parentId,
        channelId: reqBody.channelId,
        projectIcon: reqBody.projectIcon,
        weight: reqBody.weight,
        feature: reqBody.feature,
        isDelete: 0
    }
    try {
        let list = await project.find({_id: reqBody.id});
        let respon = {};
        if(list && list.length > 0) {
            let updateUser = await project.update({_id: reqBody.id}, dataArr);
            console.log(updateUser);
            respon = resdata('0000', 'success', updateUser);
        }else {
            respon = resdata('0013', 'the project is not fond');
        }
        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}


exports.removeProject = async (reqBody) => {
    try {
        let list = await project.find({_id: reqBody.id});
        let respon = {};
        if(list && list.length > 0) {
            // let list = await project.delete(dataArr);
            let dataArr = {
                isDelete: 1
            }
            let list = await project.update({_id: reqBody.id}, dataArr);
            // console.log(updateUser);
            respon = resdata('0000', 'success', list);
        }else {
            respon = resdata('0000', 'the id is not exicet', list);
        }
        return respon;
    } catch (err) {
        throw new Error(err);
        return errdata(err);
    }
}
