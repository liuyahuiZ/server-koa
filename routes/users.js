const router = require('koa-router')();
import {getUserList, register, removeUser, findUser} from '../app/controller/user'

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});
router.get('/getUser', async (ctx, next) => {
  ctx.body = await getUserList(ctx, next);
});
router.post('/findUser', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await findUser(reqBody);
});
router.post('/register', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await register(reqBody);
});
router.del('/removeUser', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await removeUser(reqBody);
});
module.exports = router;
