import {token} from '../modal/token'
import {resdata, errdata} from '../../utils/serve'
import https from 'https'

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
          path: '/cgi-bin/token?grant_type=client_credential&appid='+APPID+'&secret='+APPSECRET,
          headers: {
              'Content-Type': "application/x-www-form-urlencoded",
          }
      };
      let req = https.request(options, function (res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
              console.log('respone:',chunk);
              resolve(chunk);
              // var result=JSON.parse(chunk);
           //    console.log('BODY: ' + chunk);

              // fs.writeFile('../'+codename+'/package.json', JSON.stringify(packages),  function(err) {
              //     if (err) {
              //         return console.error(err);
              //     }
              // });
          });
      });

      req.on('error', function (e) {
          console.log('problem with request: ' + e.message);
          reject(e);
      });

      req.end();
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
