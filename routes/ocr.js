const router = require('koa-router')();
import {idFount, live, getBankInfo} from '../app/controller/ocr';

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});

router.post('/idFont', async (ctx, next) => {
  // console.log(ctx.request.body);
  let reqBody = ctx.request.body;

  const file = ctx.request.body.files.file;
  const type = ctx.request.body.fields.type;
  ctx.body = await idFount(file, type);
});

router.post('/live', async (ctx, next) => {
  // console.log(ctx.request.body);
  let reqBody = ctx.request.body;

  const file = ctx.request.body.files.file;
  const type = ctx.request.body.fields;
  console.log(type);
  ctx.body = await live(file, type);
});

router.post('/getBankInfo', async (ctx, next) => {
  // console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  const file = ctx.request.body.files.file;
  ctx.body = await getBankInfo(file);
});

module.exports = router;
