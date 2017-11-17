import {token} from '../modal/token'
import {resdata, errdata} from '../../utils/serve'
import request from 'request'
import sha1 from 'sha1'

const logUtil = require('../../utils/logUtil');

async function getToken() {
    const self = this;
    return new Promise(function (resolve, reject){
      let APPID = 'wxdbe18f838fcee2ba';
      let APPSECRET = 'c4ed6f5686ede08670db66769dfc63b4'

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
exports.getAccessToken = async (ctx, next) => {
    try {
        let list = await token.find();
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
          return respon = resdata('0000', 'success', dataArr);
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
