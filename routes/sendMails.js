const excry = require('../utils/excry');
const router = require('koa-router')();

import {sendMail, sendSMTPmail} from '../app/controller/sendMails';

router.post('/sendMail', async (ctx, next) => {
    // console.log(ctx.request.body);
    let reqBody = ctx.request.body;
    try{
        let data = await excry(reqBody.reqData);
        ctx.body = await sendMail(data);
    }catch (err){
        ctx.body = err;
    }
});

router.post('/sendSMTPmail', async (ctx, next) => {
    // console.log(ctx.request.body);
    let reqBody = ctx.request.body;
    try{
        let data = await excry(reqBody.reqData);
        ctx.body = await sendSMTPmail(data);
    }catch (err){
        ctx.body = err;
    }
});
module.exports = router;