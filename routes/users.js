const router = require('koa-router')();
import {getUserList, register, removeUser, findUser, updateUser, userLogin, userList} from '../app/controller/user'

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});
router.get('/getUser', async (ctx, next) => {
  ctx.body = await getUserList(ctx, next);
});
router.post('/findUser', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await findUser(reqBody.data);
});
router.post('/userList', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await userList(reqBody.data);
});
router.post('/userLogin', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await userLogin(reqBody.data);
});
router.post('/register', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await register(reqBody.data);
});
router.post('/updateUser', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await updateUser(reqBody.data);
});
router.post('/removeUser', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await removeUser(reqBody.data);
});
module.exports = router;
