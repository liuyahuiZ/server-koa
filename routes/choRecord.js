const router = require('koa-router')();
import { docreate, findTheRecord, addSea, getRecordList, updateRecord, removeRecord } from '../app/controller/choRecord'

router.get('/', function (ctx, next) {
  ctx.body = 'this a article response!';
});

router.post('/doCreate', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log('reqBody:', reqBody)
  ctx.body = await docreate(reqBody);
});
router.post('/updateRecord', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log('reqBody:', reqBody)
  ctx.body = await updateRecord(reqBody);
});

router.post('/findTheRecord', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await findTheRecord(reqBody);
});

router.post('/recordList', async (ctx, next) => {
    let reqBody = ctx.request.body;
    console.log(reqBody);
    ctx.body = await getRecordList(reqBody);
});

router.post('/sea', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await addSea(reqBody);
});

router.post('/removeRecord', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await removeRecord(reqBody);
});

module.exports = router;