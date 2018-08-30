import {token} from '../modal/token'
import {wxuser} from '../modal/wxuser'
import {resdata, errdata} from '../../utils/serve'
import request from 'request'
const CryptoJS = require('crypto');

const logUtil = require('../../utils/logUtil');
// const APPID = 'wx15145e4f7b434571';
// const APPSECRET = '677cf9c6a8a69bb145a37cc7bce25210'

const APPID = 'wx9a7768b6cd7f33d0';
const APPSECRET = 'ff721e6f29fe1cafa8f1e1e26d36434d';
const MCH_ID = "1502762851"
const KEY = "Qgh989eKOz3N6TrXrL83bDRXSamLxKyq"
//"2KUUBILDEETYOQCIITDQAI9TR2IACCJUW5Q89FEPI4G";


function getXMLNodeValue(node_name,xml){
    var tmp = xml.split("<"+node_name+">");
    var _tmp = tmp[1].split("</"+node_name+">");
    return _tmp[0];
}

// 随机字符串产生函数 
function createNonceStr() { 
    return Math.random().toString(36).substr(2, 15); 
} 
  
  // 时间戳产生函数 
function createTimeStamp() { 
    return parseInt(new Date().getTime() / 1000) + ''; 
}

function paysignjsapi(appid,attach,body,mch_id,nonce_str,notify_url,openid,out_trade_no,spbill_create_ip,total_fee,trade_type) {
    var ret = {
        appid: appid,
        mch_id: mch_id,
        body: body,
        nonce_str: nonce_str,
        attach: attach,
        notify_url:notify_url,
        openid:openid,
        out_trade_no:out_trade_no,
        spbill_create_ip:spbill_create_ip,
        total_fee:total_fee,
        trade_type:trade_type
    };
    var string = raw1(ret);
    var key = KEY;
    string = string + '&key='+key;
    console.log(string);
    
    let sign = CryptoJS.createHash('md5').update(string,'utf8').digest('hex');
    sign = sign.toUpperCase()
    console.log('crypto:', sign);
    return sign;

};

function raw1(args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
      newArgs[key] = args[key];
    });
    var string = '';
    for (var k in newArgs) {
      string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
};

function paysignjs(appid,nonceStr,packages,signType,timeStamp) {
    var ret = {
        appId: appid,
        nonceStr: nonceStr,
        package:packages,
        signType:signType,
        timeStamp:timeStamp
    };
    var string = raw1(ret);
    var key = KEY;
    string = string + '&key='+key;
    console.log(string);
    return CryptoJS.createHash('md5').update(string,'utf8').digest('hex');
};

async function doWxPay() {
    const self = this;
    return new Promise(function (resolve, reject){
        const timeStamp = Date.parse(new Date)/1000;
        var bookingNo = 'WX1990017'+timeStamp;
        var appid = APPID;
        var attach = '深圳分店';
        var mch_id = MCH_ID;
        var nonce_str = 'ibuaiVcKdpRxkhJA'||createNonceStr();
        var total_fee = "1";
        var notify_url = "http://47.88.2.72:2019/wxpay/callback";
        var openid = "o0kVl082vfjO9vf8kwFmIwFk377Y";
        var body = 'JSAPI支付测试';
        var url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
        let clientIp= '192.168.2.1';
        var formData  = "<xml>";
        formData  += "<appid>"+appid+"</appid>";  //appid
        formData  += "<mch_id>"+mch_id+"</mch_id>";  //商户号
        formData  += "<body>"+body+"</body>";
        formData  += "<nonce_str>"+nonce_str+"</nonce_str>"; //随机字符串，不长于32位。
        formData  += "<attach>"+attach+"</attach>"; //附加数据
        formData  += "<notify_url>"+notify_url+"</notify_url>";
        formData  += "<openid>"+openid+"</openid>";
        formData  += "<out_trade_no>"+bookingNo+"</out_trade_no>";
        formData  += "<spbill_create_ip>"+clientIp+"</spbill_create_ip>";
        formData  += "<total_fee>"+total_fee+"</total_fee>";
        formData  += "<trade_type>JSAPI</trade_type>";
        formData  += "<sign>"+paysignjsapi(appid,attach,body,mch_id,nonce_str,notify_url,openid,bookingNo,clientIp,total_fee,'JSAPI')+"</sign>";
        formData  += "</xml>";
        let options = {
            url: url,
            method: 'POST',
            body: formData,
        };
        console.log(formData);

        request(options, function(err,response,body){
            if(!err && response.statusCode == 200){
                console.log('resbody', response.statusCode, body);
                if(body.indexOf('prepay_id')>=0){
                    var prepay_id = getXMLNodeValue('prepay_id',body.toString("utf-8"));
                    var tmp = prepay_id.split('[');
                    var tmp1 = tmp[2].split(']');
                    //签名
                    var _paySignjs = paysignjs(appid,nonce_str,'prepay_id='+tmp1[0],'MD5',timeStamp);
                    resolve({prepay_id:tmp1[0],_paySignjs:_paySignjs});
                } else{
                    reject(body);
                }
                
            } else {
                reject(err);
            }
        });
    })
}

exports.pay = async (reqBody) => {
    try {
        let payInfo = await doWxPay();
        console.log(payInfo)
        return resdata('0000', 'success', payInfo);
    } catch (err) {
        console.log(err)
        return errdata(err);
    }

}

exports.payCallback = async (reqBody) => {
    try {
        console.log(reqBody)
        return resdata('0000', 'success', reqBody);
    } catch (err) {
        return errdata(err);
    }

}