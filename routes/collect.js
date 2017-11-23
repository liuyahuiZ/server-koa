const router = require('koa-router')();
import {getTheCollectList,getCollectList, create,docreate, removeCollect} from '../app/controller/collect'

router.get('/', function (ctx, next) {
  ctx.body = 'this a getTheCollectList response!';
});
router.get('/getCollect', async (ctx, next) => {
  console.log(ctx.query.id);
  ctx.body = await getTheCollectList(ctx.query);
});
router.get('/createCollectAll', async (ctx, next) => {
  console.log(ctx.query.id);
  ctx.body = await docreate(ctx.query);
});
router.post('/findAllCollects', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await getCollectList(reqBody);
});
router.post('/findCollects', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await getTheCollectList(reqBody);
});
router.post('/createCollect', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await create(reqBody);
});
router.del('/removeCollect', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await removeCollect(reqBody);
});
module.exports = router;
