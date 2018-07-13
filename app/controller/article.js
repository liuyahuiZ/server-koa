import {article} from '../modal/article'
import {comment} from '../modal/comment'
import {resdata, errdata} from '../../utils/serve'

const logUtil = require('../../utils/logUtil');


exports.articleList = async (reqBody) => {
    let dataArr = {
    }
    let currentPage = parseInt(reqBody.currentPage) || 1;
    let pageSize = parseInt(reqBody.pageSize)||10;
    let startNum =  (currentPage-1) * pageSize; 
    
    let skip = {skip:startNum,limit:pageSize,sort:{"createTime":-1}};
    try {
        let allList = await article.find(dataArr);
        let allPages = allList.length/pageSize;
        if(allPages>parseInt(allPages)){
            allPages=parseInt(allPages)+1
        }
        console.log(allList, allList.length);
        let pageInfo = {
            allPage: allPages,
            allCount: allList.length,
            currentPage: currentPage,
            pageSize: pageSize,
        }
        if(currentPage>allPages) {
            return resdata('0000', 'no more', {pageInfo: pageInfo});
        }
        let list = await article.find(dataArr, skip);
        return resdata('0000', 'success', {pageInfo: pageInfo, list: list});
    } catch (err) {
        return errdata(err);
    }
}

exports.articleDetail = async (reqBody) => {
    console.log(reqBody.id);
    try {
        let list = await article.find({_id: reqBody.id});
        let newSea = 1;
        if(list[0].sea){
            newSea=list[0].sea+1
        }
        let upData = {
            sea: newSea
        }
        let upResult = await article.update({_id: reqBody.id}, upData);
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}

exports.createArticle = async (reqBody) => {
    let dataArr = {
        user: reqBody.user,
        title: reqBody.title,
        info: reqBody.info,
        content: reqBody.content,
        type: reqBody.type,
        typecode: reqBody.typecode,
        imgGroup: reqBody.imgGroup,
    }
    try {
        let newUser = await article.create(dataArr);
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

exports.updateArticle = async (reqBody) => {
    let dataArr = {
        user: reqBody.user,
        title: reqBody.title,
        info: reqBody.info,
        content: reqBody.content,
        type: reqBody.type,
        typecode: reqBody.typecode,
        imgGroup: reqBody.imgGroup
    }
    try {
        let list = await article.find({_id: reqBody.id});
        let respon = {};
        if(list && list.length > 0) {
            respon = resdata('0013', 'the article is not fond');
        }else {
            let updateUser = await article.update({_id: reqBody.id}, dataArr);
            console.log(updateUser);
            respon = resdata('0000', 'success', updateUser);
        }
        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}

exports.mkCommit = async (reqBody) => {
    try {
        let dataArr = {
            user: reqBody.user,
            repayuser: reqBody.repayuser,
            content: reqBody.content,
        };
        let crea = await comment.create(dataArr);
        console.log(crea);
        let list = await article.find({_id: reqBody.id});
        let allcommernts=[];
        if(list[0].comment){
            allcommernts=list[0].comment;
        }else{
            allcommernts=[];
        }
        allcommernts.push(product);
        let updateUser = await article.update({_id: reqBody.id}, {
            comment:allcommernts
        });
        return resdata('0000', 'success', updateUser);
    } catch (err) {
        return errdata(err);
    }
}

exports.removeArticle = async (id) => {
    let dataArr = {
        id: id,
    }
    try {
        let list = await article.find({_id: id});
        let respon = {};
        if(list && list.length > 0) {
            let list = await article.delete(dataArr);
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