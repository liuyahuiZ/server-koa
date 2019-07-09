const router = require('koa-router')();
import {getPage} from '../app/controller/spider'
import {addStoreRecord, getStoreList, getStoreCollect} from '../app/controller/birary'

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});
router.get('/getPage', async (ctx, next) => {
  ctx.body = await getPage(ctx, next);
});
router.get('/storeList', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await getStoreList(reqBody);
});
router.get('/storeRecordList', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await getStoreCollect(reqBody);
});
router.post('/addStoreRecord', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await addStoreRecord(reqBody);
});

module.exports = router;
