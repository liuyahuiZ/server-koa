import {babyUser} from '../modal/babyUser'
import {resdata, errdata} from '../../utils/serve'
import { dxcry, excry } from '../../utils/excry';

const CryptoJS = require('crypto');
const logUtil = require('../../utils/logUtil');

async function getToken(userInfo) {
    return new Promise(function (resolve, reject) {
        try {
            let token = {
                num: parseInt(Math.random() * Math.pow(10, 15)),
                time: (new Date()).getTime(),
                userId: userInfo._id,
                limitTime: 3600*1000*2,
            }
            dxcry(token).then((res)=>{
                console.log('token', res);
                resolve(res);
            }).catch((err)=>{
                console.log('err', err)
                reject(err) ;
            });
            // resolve(encodeToken);
        } catch (err) {
            console.log('err', err)
            reject(err) ;
        }
    })
}

exports.getUserList = async (ctx, next) => {
    try {
        let list = await babyUser.find();
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}

exports.findUser = async (reqBody) => {
    try {
        let list = await babyUser.find({phone: reqBody.phone});
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}

exports.userLogin = async (reqBody) => {
    try {
        let list = await babyUser.find({username: reqBody.username});
        let respon = {}

        if(list && list.length > 0) {
           let password =  CryptoJS.createHash('md5').update(reqBody.loginPassword,'utf8').digest('hex');
           console.log('password', password, list[0].password)
           if(password===list[0].password){
            
            let userInfo = {
                _id: list[0]._id,
                username: list[0].username,
                role: list[0].role,
                imgUrl: list[0].imgUrl,
                remark:list[0].remark,
                sex: list[0].sex,
                typecode: list[0].typecode
            }
            let token = await getToken(userInfo)
            console.log('token', token)
            userInfo.token = token
            respon = resdata('0000', 'login success', userInfo);
           } else{
            respon = resdata('9999', 'password Error');
           }
            
        }else {
            respon = resdata('9999', 'the user is not exicet');
        }
        return respon;
    } catch (err) {
        return errdata(err);
    }
}

exports.userList = async (reqBody) => {
    let dataArr = {
    }
    let currentPage = parseInt(reqBody.current) || 1;
    let pageSize = parseInt(reqBody.size)||10;
    let startNum =  (currentPage-1) * pageSize;
    
    let skip = {skip:startNum,limit:pageSize,sort:{"createTime":-1}};
    try {
        let allList = await babyUser.find(dataArr);
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
            return resdata('0000', 'no more', { pageInfo:pageInfo, records:[]});
        }
        let list = await babyUser.find(dataArr, skip);
        return resdata('0000', 'success', { pageInfo:pageInfo, records: list});
    } catch (err) {
        return errdata(err);
    }
}

exports.register = async (reqBody) => {
    let dataArr = {
        username: reqBody.username,
        userid: reqBody.userid,
        birthday: reqBody.birthday,
        height: reqBody.height,
        weight: reqBody.weight,
        remark: reqBody.remark,
        role: reqBody.role,
        sex: reqBody.sex,
        phone: reqBody.phone,
        password: CryptoJS.createHash('md5').update(reqBody.password,'utf8').digest('hex'),
        imgUrl: reqBody.imgUrl
    }
    try {
        let list = await babyUser.find({username: reqBody.username});
        let respon = {};
        if(list && list.length > 0) {
            respon = resdata('0000', 'the user is exicet', list);
        }else {
            let newUser = await babyUser.create(dataArr);
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
exports.updateUser = async (reqBody) => {
    let dataArr = {
        username: reqBody.username,
        userid: reqBody.userid,
        birthday: reqBody.birthday,
        height: reqBody.height,
        weight: reqBody.weight,
        remark: reqBody.remark,
        role: reqBody.role,
        sex: reqBody.sex,
        phone: reqBody.phone,
        imgUrl: reqBody.imgUrl
    }
    try {
        let list = await babyUser.find({_id: reqBody.id});
        let respon = {};
        if(list && list.length > 0) {
            if(list[0].password!==reqBody.password){
                dataArr.password = CryptoJS.createHash('md5').update(reqBody.password,'utf8').digest('hex')
            }
            console.log('dataArr', dataArr)
            let newUser = await babyUser.update({_id: reqBody.id}, dataArr);
            console.log(newUser);
            respon = resdata('0000', 'update success', newUser);
        }else {
            
            respon = resdata('9999', 'the user is not exicet');
        }
        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}
exports.removeUser = async (reqBody) => {
    let dataArr = {
        id: reqBody._id,
    }
    try {
        let list = await babyUser.find({
            _id: reqBody._id,
        });
        let respon = {}
        if(list && list.length > 0) {
            let list = await babyUser.delete(dataArr);
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
