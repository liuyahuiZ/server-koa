const router = require('koa-router')();
import { articleList, articleDetail, createArticle, updateArticle, mkCommit, removeArticle} from '../app/controller/article'

router.get('/', function (ctx, next) {
  ctx.body = 'this a article response!';
});

router.post('/getArticle', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await articleList(reqBody);
});

router.get('/articleDetail', async (ctx, next) => {
  let id = ctx.query;
  ctx.body = await articleDetail(id, next);
});

router.post('/createArctile', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await createArticle(reqBody);
});

router.post('/updateArctile', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await updateArticle(reqBody);
});


router.post('/mkCommit', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await mkCommit(reqBody);
});

router.post('/removeArticle', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await removeArticle(reqBody);
});

router.get('/removeArticle', async (ctx, next) => {
  console.log(ctx.query.id);
  let id = ctx.query.id;
  ctx.body = await removeArticle(id);
});
module.exports = router;
