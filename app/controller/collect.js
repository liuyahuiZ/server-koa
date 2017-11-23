import {collect} from '../modal/collect'
import {resdata, errdata} from '../../utils/serve'

const logUtil = require('../../utils/logUtil');

exports.getCollectList = async (ctx, next) => {
    try {
        let list = await collect.find();
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}
exports.getTheCollectList = async (reqBody) => {
    let dataArr = {
        fileid: reqBody.fileid,
    }
    try {
        let list = await collect.find(dataArr);
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}
exports.docreate = async (reqBody) => {
    let dataArr = {
        fileid: reqBody.fileid,
        userid: reqBody.userid,
    }
    try {
          for(let i=0;i<reqBody.number;i++){
            let newUser = await collect.create(dataArr);
            console.log(newUser);
          }
          let respon = resdata('0000', 'success');
        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}
exports.create = async (reqBody) => {
    let dataArr = {
        fileid: reqBody.fileid,
        userid: reqBody.userid,
    }
    try {
        let list = await collect.find(dataArr);
        let respon = {};
        if(list && list.length > 0) {
            respon = resdata('0013', 'the collect is exicet', list);
        }else {
            let newUser = await collect.create(dataArr);
            console.log(newUser);
            respon = resdata('0000', 'success', newUser);
        }
        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}
exports.removeCollect = async (reqBody) => {
    let dataArr = {
        _id: reqBody.id,
    }
    try {
        let list = await collect.find(dataArr);
        let respon = {}
        if(list && list.length > 0) {
            let list = await collect.delete(dataArr);
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
