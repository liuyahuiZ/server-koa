const router = require('koa-router')();
import { articleList, articleDetail, createArticle, updateArticle, mkCommit, findCommit, makeCommit, removeArticle, getArticleDetail, typeArticleList} from '../app/controller/video'

router.get('/', function (ctx, next) {
  ctx.body = 'this a article response!';
});

router.post('/getArticle', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await articleList(reqBody.data);
});

router.post('/typeArticleList', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await typeArticleList(reqBody.data);
});

router.post('/articleDetail', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await articleDetail(reqBody.data);
});

router.post('/articleDetails', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await getArticleDetail(reqBody.data);
});

router.post('/createArctile', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await createArticle(reqBody.data);
});

router.post('/updateArctile', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await updateArticle(reqBody.data);
});


router.post('/mkCommit', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await mkCommit(reqBody.data);
});

router.post('/findCommit', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await findCommit(reqBody.data);
});

router.post('/makeCommit', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await makeCommit(reqBody.data);
});

router.post('/removeArticle', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await removeArticle(reqBody.data);
});

router.get('/removeArticle', async (ctx, next) => {
  console.log(ctx.query.id);
  let id = ctx.query.id;
  ctx.body = await removeArticle(id);
});
module.exports = router;
