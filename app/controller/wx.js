import {token} from '../modal/token'
import {resdata, errdata} from '../../utils/serve'
import request from 'request'
import sha1 from 'sha1'
import config from '../../config/menuConfig'

const logUtil = require('../../utils/logUtil');
const APPID = 'wx15145e4f7b434571';
const APPSECRET = '677cf9c6a8a69bb145a37cc7bce25210'

async function getToken() {
    const self = this;
    return new Promise(function (resolve, reject){

      let options = {
          method: 'GET',
          hostname: 'api.weixin.qq.com',
          port: 80,
          path: '/cgi-bin/token?grant_type=client_credential&appid='+APPID+'&secret='+APPSECRET
      };

      request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APPID + '&secret=' + APPSECRET , function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // Show the HTML for the baidu homepage.
          resolve(body);
        } else {
          reject(error);
        }
      })
    })
}

//获取网页授权token
async function getWebToken(code) {
    const self = this;
    return new Promise(function (resolve, reject){

      request('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + APPID + '&secret=' + APPSECRET + '&code='+ code +'&grant_type=authorization_code' , function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // Show the HTML for the baidu homepage.
        //   const userInfo = await getUserInfo();
          resolve(body);
        } else {
          reject(error);
        }
      })
    })
}

//获取用户信息
async function getUserInfo(obj) {
    return new Promise(function (resolve, reject){
      let req = JSON.parse(obj);
      console.log('access_token', obj, JSON.parse(obj), obj.access_token);
      request('https://api.weixin.qq.com/sns/userinfo?access_token='+ req.access_token +'&openid='+ req.openid +'&lang=zh_CN' , function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // Show the HTML for the baidu homepage.
          resolve(body);
        } else {
          reject(error);
        }
      })
    })
}

async function getJsapiTicket(token) {
    const self = this;
    return new Promise(function (resolve, reject){
      request('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+token+'&type=jsapi', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // Show the HTML for the baidu homepage.
          resolve(body);
        } else {
          reject(error);
        }
      })
    })
}

async function createMenusReq(token) {
    const self = this;
    return new Promise(function (resolve, reject){
      let options = {
          url: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token='+token.tokenid,
          method: 'POST',
          json: true,
          headers: {
              "content-type": "application/json",
          },
          body: config
        };

        request( options , function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the baidu homepage.
            resolve(body);
          } else {
            reject(error);
          }
        })
    })
}

//群发发送消息
async function sendMessageReq(token, text) {
    const self = this;
    return new Promise(function (resolve, reject){
      let options = {
          url: 'https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token='+token.tokenid,
          method: 'POST',
          json: true,
          headers: {
              "content-type": "application/json",
          },
          body: {
             "touser":[
              "o7vpA1s0OLLSrPK47Y5sLNDI7NKs",
              "o7vpA1lYSUsCMwDnA45ggkq4FE3A",
              "o7vpA1ozO-FNQ1pLFyEyXwplLZhU",
              "o7vpA1tpsXU85-jue6jUONdCHt6k",
              "o7vpA1qMt3wBqb-_MRJbjexMMKys",
              "o7vpA1ihPw-TV_iTLuRHuJtLZQZc"
             ],
             "msgtype": "text",
             "text": { "content": text || 'hello!'}
          }
        };

        request( options , function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the baidu homepage.
            resolve(body);
          } else {
            reject(error);
          }
        })
    })
}

// 发送消息模版
async function sendTemplateReq(token, text) {
    const self = this;
    return new Promise(function (resolve, reject){
      let options = {
          url: 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='+token.tokenid,
          method: 'POST',
          json: true,
          headers: {
              "content-type": "application/json",
          },
          body: {
             "touser":"o7vpA1s0OLLSrPK47Y5sLNDI7NKs",
             "template_id": "DeLNpFR0fO5FZ0fanrtLPuPhOvxJjxrIq8Fgsiyq9Yk",
             "url":"http://www.wetalks.cn/F2E",
             "data":{
                   "first": {
                       "value":"恭喜你充值成功！",
                       "color":"#173177"
                   },
                   "keyword1":{
                       "value":"巧克力",
                       "color":"#173177"
                   },
                   "keyword2": {
                       "value":"39.8元",
                       "color":"#173177"
                   }
           }
          }
        };

        request( options , function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the baidu homepage.
            resolve(body);
          } else {
            reject(error);
          }
        })
    })
}

// 获取关注用户列表
async function getUserListReq(token, text) {
    const self = this;
    return new Promise(function (resolve, reject){
      let options = {
          url: 'https://api.weixin.qq.com/cgi-bin/user/get?access_token='+token.tokenid,
          method: 'GET',
          json: true,
          headers: {
              "content-type": "application/json",
          }
        };

        request( options , function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the baidu homepage.
            resolve(body);
          } else {
            reject(error);
          }
        })
    })
}

async function getHistoryToken(){
  const where = {skip:0,limit:5,sort:{"createTime":-1}}
  let list = await token.find({}, where);
  console.log('list:',list[0]);
  let Now = Date.parse(new Date);
  if(list&&list.length>0&& (Now - list[0].startTmp) /1000 < list[0].limit) {
     console.log('has');
    return list[0];
  }else {
    console.log('empty')
    let tokens = await getToken();
    console.log(tokens, typeof tokens);
    let newToken = JSON.parse(tokens);
    let jsticket = await getJsapiTicket(newToken.access_token);
    let newJsticket = JSON.parse(jsticket);
    console.log(newJsticket, typeof newJsticket);
    let dataArr= {
      tokenid: newToken.access_token,
      limit: newToken.expires_in,
      jsticket: newJsticket.ticket,
      startTmp: Date.parse(new Date),
    }
    let newUser = await token.create(dataArr);
    console.log(newUser);
    return dataArr;
  }
}
exports.getAccessToken = async (ctx, next) => {
    try {
        const where = {skip:0,limit:5,sort:{"createTime":-1}}
        let list = await token.find({}, where);
        console.log('list:',list);
        let Now = Date.parse(new Date);
        if(list&&list.length>0&& (Now - list[0].startTmp) /1000 < list[0].limit) {
           console.log('has');
          return respon = resdata('0000', 'success', list[0]);
        }else {
          console.log('empty')
          let tokens = await getToken();
          console.log(tokens, typeof tokens);
          let newToken = JSON.parse(tokens);
          let jsticket = await getJsapiTicket(newToken.access_token);
          let newJsticket = JSON.parse(jsticket);
          console.log(newJsticket, typeof newJsticket);
          let dataArr= {
            tokenid: newToken.access_token,
            limit: newToken.expires_in,
            jsticket: newJsticket.ticket,
            startTmp: Date.parse(new Date),
          }
          let newUser = await token.create(dataArr);
          console.log(newUser);
          return resdata('0000', 'success', dataArr);
        }
    } catch (err) {
        return errdata(err);
    }
}

exports.sign = async (reqBody) => {
    const noncestr='Wm3WZYTPz0wzccnW12';
    const url = decodeURIComponent(reqBody.url);
    console.log('url',  reqBody.url, decodeURIComponent(reqBody.url))
    const timestamp = Date.parse(new Date)/1000;
    try {
        const where = {skip:0,limit:5,sort:{"createTime":-1}}
        let list = await token.find({}, where);
        console.log('list:',list[0]);
        let Now = Date.parse(new Date);
        if(list&&list.length>0&& (Now - list[0].startTmp) /1000 < list[0].limit) {
           console.log('has');
           let data = {
             noncestr:noncestr,
             timestamp: timestamp,
             url: url,
             jsapi_ticket:list[0].jsticket,
             signature:sha1('jsapi_ticket=' + list[0].jsticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url)
           }
          return resdata('0000', 'success', data);
        }else {
          console.log('empty')
          let tokens = await getToken();
          console.log(tokens, typeof tokens);
          let newToken = JSON.parse(tokens);
          let jsticket = await getJsapiTicket(newToken.access_token);
          let newJsticket = JSON.parse(jsticket);
          let dataArr= {
            tokenid: newToken.access_token,
            limit: newToken.expires_in,
            jsticket: newJsticket.ticket,
            startTmp: Date.parse(new Date),
          }

          let newUser = await token.create(dataArr);
          let data = {
            noncestr:noncestr,
            timestamp: timestamp,
            url: url,
            jsapi_ticket:ticketMap.ticket,
            signature:sha1('jsapi_ticket=' + newJsticket.ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url)
          }
          console.log(newUser);
          return resdata('0000', 'success', data);
        }
    } catch (err) {
        return errdata(err);
    }
}

//创建菜单
exports.createMenu = async (ctx, next) => {
    try {
        let tokens = await getHistoryToken();
        console.log(tokens, JSON.stringify(config));

        let creatResult = await createMenusReq(tokens);
        console.log(creatResult);
        return resdata('0000', 'success', creatResult);
    } catch (err) {
        return errdata(err);
    }
}

// 群发消息
exports.senAllMessage = async (reqBody) => {
    try {
        let tokens = await getHistoryToken();
        let creatResult = await sendMessageReq(tokens, reqBody.msg);
        console.log('creatResult:', creatResult);
        return resdata('0000', 'success', creatResult);
    } catch (err) {
        return errdata(err);
    }
}

// 发送模版消息
exports.senTemplateMessage = async (reqBody) => {
    try {
        let tokens = await getHistoryToken();
        let creatResult = await sendTemplateReq(tokens);
        console.log('sendTemplateReq:', creatResult);
        return resdata('0000', 'success', creatResult);
    } catch (err) {
        return errdata(err);
    }
}


// 获取用户列表
exports.getUserList = async (reqBody) => {
    try {
        let tokens = await getHistoryToken();
        let creatResult = await getUserListReq(tokens);
        console.log('getUserList:', creatResult);
        return resdata('0000', 'success', creatResult);
    } catch (err) {
        return errdata(err);
    }
}

// 获取网页授权token
exports.getWebAccessToken = async (reqBody) => {
    try {
        let tokens = await getWebToken(reqBody.code);
        console.log('tokens', tokens, typeof(tokens))
        let userInfo = await getUserInfo(tokens);
        console.log('creatResult:', userInfo);
        return resdata('0000', 'success', userInfo);
    } catch (err) {
        return errdata(err);
    }
}