import {article} from '../modal/article'
import {comment} from '../modal/comment'
import {blockType} from '../modal/blockType'
import {resdata, errdata} from '../../utils/serve'
import { commitEmit } from '../../service/commitEmit';

const logUtil = require('../../utils/logUtil');

exports.articleList = async (reqBody) => {
    let dataArr = reqBody.searchObg || {
    }
    let sort = {"createTime":-1};
    if(reqBody.keyWord) {
        dataArr['title']=new RegExp(reqBody.keyWord);//模糊查询参数
        dataArr['content']=new RegExp(reqBody.keyWord);
    }
    if(reqBody.sort){
        sort = reqBody.sort
    }
    let currentPage = parseInt(reqBody.current) || 1;
    let pageSize = parseInt(reqBody.pageSize)||10;
    let startNum =  (currentPage-1) * pageSize;
    
    let skip = {skip:startNum,limit:pageSize,sort: sort};
    try {
        let allList = await article.find(dataArr);
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
        if(currentPage>allPages) {
            return resdata('0000', 'no more', {list: [], pageInfo: pageInfo});
        }
        let list = await article.find(dataArr, skip, '-content');
        return resdata('0000', 'success', {pageInfo: pageInfo, list: list});
    } catch (err) {
        return errdata(err);
    }
}

exports.typeArticleList = async (reqBody, next) => {
    try {
        let list = await blockType.find({}, {});
        let newList = []
        for(let i=0; i<list.length; i++){
          let dataArr = {
            type: list[i].typeValue,
          }
        let currentPage = 1;
        let pageSize = 3;
        let startNum =  (currentPage-1) * pageSize;
        
        let skip = {skip:startNum,limit:pageSize,sort:{"createTime":-1}};
        let articleList = await article.find(dataArr, skip, '-content');
        //   newList[i] = list[i];
          newList.push({ info: list[i],
            articleList: articleList});
        }
        return resdata('0000', 'success', newList);
    } catch (err) {
        console.log('err',err)
        return errdata(err);
    }
}

exports.articleDetail = async (reqBody) => {
    // console.log(reqBody.id);
    try {
        let list = await article.find({_id: reqBody.id});
        // console.log('list>>>', list)
        console.log('reqBody.id', reqBody.id)
        let commentlist = await comment.find({articleId: reqBody.id});
        console.log('comment>>>',  commentlist)
        let newSea = 1;
        if(list[0].sea){
            newSea=list[0].sea+1
        }
        let upData = {
            sea: newSea
        }
        
        let upResult = await article.update({_id: reqBody.id}, upData);
        return resdata('0000', 'success', {article: list[0], comment: commentlist});
    } catch (err) {
        return errdata(err);
    }
}

exports.getArticleDetail = async (reqBody) => {
    // console.log(reqBody.id);
    try {
        let list = await article.find({_id: reqBody._id});
        if(list && list.length > 0) {
            return resdata('0000', 'success', list[0]);
        }else {
            respon = resdata('0013', 'the article is not fond');
        }
        
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
            let updateUser = await article.update({_id: reqBody.id}, dataArr);
            console.log(updateUser);
            respon = resdata('0000', 'success', updateUser);
        }else {
            respon = resdata('0013', 'the article is not fond');
        }
        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}

exports.findCommit = async (reqBody) => {
    try {
        let dataArr = {
            articleId: reqBody.id,
        };
        // let skip = {sort:{"createTime":-1}};
        let crea = await comment.find(dataArr);
        let pageInfo = {
            pages: 1,
            total: crea.length,
            currentPage: 1,
            pageSize: 100,
            allCount: crea.length,
            allPage: 1,
            pageNumber: 1
        }
        return resdata('0000', 'success', {records: crea, pageInfo: pageInfo})
    } catch (err) {
        return errdata(err);
    }
}

exports.makeCommit = async (reqBody) => {
    console.log('reqBody', reqBody)
    try {
        let dataArr = {
            user: reqBody.user,
            repayuser: reqBody.repayuser,
            content: reqBody.content,
            articleId: reqBody.articleId,
        };
        let crea = await comment.create(dataArr);
        // var emitter = new events.EventEmitter();
        // emitter.emit("commit_event", dataArr); 
        commitEmit(dataArr);
        return resdata('0000', 'success', crea);
    } catch (err) {
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

exports.removeArticle = async (reqBody) => {
    let dataArr = {
        id: reqBody._id,
    }
    try {
        let list = await article.find({_id: reqBody._id});
        let respon = {};
        if(list && list.length > 0) {
            let list = await article.delete({id: reqBody._id});
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
