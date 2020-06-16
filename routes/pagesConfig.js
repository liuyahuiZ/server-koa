const router = require('koa-router')();
import { pageConfigList, pageConfigDetail, createPageConfig, updatePageConfig, removePageConfig} from '../app/controller/pageConfig'

router.get('/', function (ctx, next) {
  ctx.body = 'this a article response!';
});

router.post('/pageConfig_qry', async (ctx, next) => {
  let reqBody = ctx.request.body;
  // console.log('reqBody', reqBody);
  ctx.body = await pageConfigList(reqBody.data);
});

router.post('/pageConfig_get', async (ctx, next) => {
  let reqBody = ctx.request.body;
  // console.log('reqBody', reqBody);
  ctx.body = await pageConfigDetail(reqBody.data, next);
});

router.post('/pageConfig_add', async (ctx, next) => {
  let reqBody = ctx.request.body;
  // console.log(reqBody);
  ctx.body = await createPageConfig(reqBody.data);
});

router.post('/pageConfig_modify', async (ctx, next) => {
  let reqBody = ctx.request.body;
  // console.log(reqBody);
  ctx.body = await updatePageConfig(reqBody.data);
});

router.post('/pageConfig_delete', async (ctx, next) => {
  // console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await removePageConfig(reqBody.data);
});

module.exports = router;
