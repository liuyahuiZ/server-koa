import {token} from '../modal/token'
import {resdata, errdata} from '../../utils/serve'
import request from 'request'

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
        }
      })
    })
}
exports.getAccessToken = async (ctx, next) => {
    try {
        let list = await token.find();
        console.log('list:',list);
        if(list&&list.length>0) {
          console.log('has')
        }else {
          console.log('empty')
          let token = await getToken();
          console.log(token);
        }
    } catch (err) {
        return errdata(err);
    }
}
