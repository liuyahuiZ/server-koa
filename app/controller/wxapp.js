import {token} from '../modal/token'
import {resdata, errdata} from '../../utils/serve'
import request from 'request'
import sha1 from 'sha1'

const APPID = 'wxf475ee423c2185eb';
const APPSECRET = 'a16f68f58d6da3635c4e555e62d01c11';
//获取网页授权token
async function getOpenID(code) {
  console.log(code);
  return new Promise(function (resolve, reject){
    request('https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + APPSECRET + '&js_code='+ code +'&grant_type=authorization_code' , function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the baidu homepage.
      //   const userInfo = await getUserInfo();
        resolve(body);
      } else {
        console.log(error)
        reject(error);
      }
    })
  })
}

//获取网页授权token
async function getWebToken(code) {
    const self = this;
    return new Promise(function (resolve, reject){
      let APPID = 'wx15145e4f7b434571';
      let APPSECRET = '677cf9c6a8a69bb145a37cc7bce25210'

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

exports.getUserOpenID = async (reqBody) =>{
  try {
    if(reqBody.code){
      let tokens = await getOpenID(reqBody.code);
      console.log('tokens', tokens, typeof(tokens));
      return resdata('0000', 'success', userInfo);
    }
    // let userInfo = await getUserInfo(tokens);
    // console.log('creatResult:', userInfo);
    return resdata('0000', 'code is not fond', {});
  } catch (err) {
      return errdata(err);
  }
}