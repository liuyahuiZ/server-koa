const router = require('koa-router')();
import { pageList, projectDetail, createPage, updatePage, removePage, copyPage} from '../app/controller/pages'

router.get('/', function (ctx, next) {
  ctx.body = 'this a article response!';
});

router.post('/page_qry', async (ctx, next) => {
  let reqBody = ctx.request.body;
  // console.log('reqBody', reqBody);
  ctx.body = await pageList(reqBody.data);
});

router.post('/copyPage', async (ctx, next) => {
  let reqBody = ctx.request.body;
  // console.log('reqBody', reqBody);
  ctx.body = await copyPage(reqBody.data);
});

router.post('/project_get', async (ctx, next) => {
  let reqBody = ctx.request.body;
  // console.log('reqBody', reqBody);
  ctx.body = await projectDetail(reqBody.data, next);
});

router.post('/page_add', async (ctx, next) => {
  let reqBody = ctx.request.body;
  // console.log(reqBody);
  ctx.body = await createPage(reqBody.data);
});

router.post('/page_modify', async (ctx, next) => {
  let reqBody = ctx.request.body;
  // console.log(reqBody);
  ctx.body = await updatePage(reqBody.data);
});

router.post('/page_delete', async (ctx, next) => {
  // console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await removePage(reqBody.data);
});

module.exports = router;
