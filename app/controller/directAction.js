import {resdata, errdata} from '../../utils/serve'
const logUtil = require('../../utils/logUtil');
import request from 'request'

async function requestApi() {
    return new Promise(function (resolve, reject){
      let options = {
        url: 'http://192.180.51.154:9999/sump/rest/auth/login',
        method: 'POST',
        json: true,
        headers: {
            "content-type": "application/json",
        }
      };
      console.log(options)
      request(options, function (error, response, body) {
        console.log('res')
        if (!error && response.statusCode == 200) {
          console.log(body) // Show the HTML for the baidu homepage.
          resolve(body);
        } else {
          reject(error);
        }
      })
    })
}

exports.doAction = async (ctx, next) => {
    try {
        for(let i=0;i<10;i++){
            console.log('i', i)
            let tokens = await requestApi();
            console.log('tokens', tokens);
        }
        
    } catch (err) {
        return errdata(err);
    }
}

