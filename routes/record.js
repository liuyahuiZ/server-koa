const router = require('koa-router')();
import { docreate, getRecordList, removeRecord, getRecordListForType, getRecordListForTime } from '../app/controller/record'

router.get('/', function (ctx, next) {
  ctx.body = 'this a article response!';
});

router.post('/doCreate', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await docreate(reqBody);
});

router.post('/recordList', async (ctx, next) => {
    let reqBody = ctx.request.body;
    console.log(reqBody);
    ctx.body = await getRecordList(reqBody);
});

router.post('/recordListForTime', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await getRecordListForTime(reqBody);
});

router.post('/recordListForType', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await getRecordListForType(reqBody);
});

router.post('/recordList', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await getRecordList(reqBody);
});

router.post('/removeRecord', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await removeRecord(reqBody);
});

module.exports = router;