import {resdata, errdata} from '../../utils/serve'
import http from 'http'

const logUtil = require('../../utils/logUtil');

exports.getAccessToken = async (ctx, next) => {
    try {
        let APPID = '';
        let APPSECRET = ''

        let reqdate=encodeURI(JSON.stringify(dates))
        let options = {
            method: 'GET',
            hostname: 'https://api.weixin.qq.com',  
            path: '/cgi-bin/token?grant_type=client_credential&appid='+APPID+'&secret='+APPSECRET,
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
            }
        };
        let req = http.request(options, function (res) {  
            console.log('STATUS: ' + res.statusCode);  
            console.log('HEADERS: ' + JSON.stringify(res.headers));  
            res.setEncoding('utf8');  
            res.on('data', function (chunk) {  
                console.log('respone:',chunk);
                // var result=JSON.parse(chunk);
             //    console.log('BODY: ' + chunk);

                // fs.writeFile('../'+codename+'/package.json', JSON.stringify(packages),  function(err) {
                //     if (err) {
                //         return console.error(err);
                //     }
                // });
            });  
        });  
        req.write(reqdate);
        req.on('error', function (e) {  
            console.log('problem with request: ' + e.message);  
        });  
          
        req.end();
    } catch (err) {
        return errdata(err);
    }
}
