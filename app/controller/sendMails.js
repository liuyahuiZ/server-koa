import {resdata, errdata} from '../../utils/serve'
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

async function transport(options) {
    const self = this;
    let transporter = nodemailer.createTransport({
        // service: 'Gmail',
        service: 'qq',
        port: 465, // SMTP 端口
        secureConnection: true,
        auth: {
            user: '690385384@qq.com',
            pass: 'yiugauppxdwubcgd'
        }
    });
    return new Promise(function (resolve, reject){
        transporter.sendMail(options, function(error, info){
            if(error){
                reject(error);
            }
            resolve(info)
        });
    })
}

async function smtpTransporter(options){
    const self = this;
    let transport = nodemailer.createTransport(smtpTransport({
        host: "smtp.exmail.qq.com", // 主机
        // secure: true, // 使用 SSL
        // secureConnection: true, // 使用 SSL
        port: 25, // SMTP 端口
        auth: {
            user: "sys.jft@jfpal.com", // 账号
            pass: "JFintech2017" // 密码
        }
    }));
    return new Promise(function (resolve, reject){
        transport.sendMail(options, function(error, info){
            if(error){
                reject(error);
            }
            resolve(info)
        });
    })
}

exports.sendMail = async (reqBody)=>{
    try{
        let mailOptions = {
            from: '690385384@qq.com', // sender address
            to: reqBody.toEmail, // list of receivers
            subject: reqBody.tirtle, // Subject line
            text: 'Hello world', // plaintext body
            html: reqBody.content // html body
        };
        let result = await transport(mailOptions);
        console.log(result);
        return resdata('0000', 'success', result)
    }catch(err){
        return errdata(err);
    }
}

exports.sendSMTPmail = async (reqBody)=>{
    try{
        // 设置邮件内容
        let mailOptions = {
            from: "sys.jft@jfpal.com", // 发件地址
            to: reqBody.toEmail, // 收件列表
            subject: reqBody.tirtle, // 标题
            text: "hello",
            html: reqBody.content // html 内容
        }
        let result = await smtpTransporter(mailOptions);
        return resdata('0000', 'success', result)
    }catch(err){
        return errdata(err);
    }
}