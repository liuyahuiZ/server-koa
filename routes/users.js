const router = require('koa-router')();
import {getUserList, register, removeUser} from '../app/controller/user'

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});
router.get('/getUser', async (ctx, next) => {
  let list = await getUserList(ctx, next);
  ctx.body = list;
});
router.post('/register', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  let list = await register(reqBody);
  ctx.body = list;
});
router.post('/removeUser', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  let list = await removeUser(reqBody);
  ctx.body = list;
});
module.exports = router;
