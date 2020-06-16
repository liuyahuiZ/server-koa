const router = require('koa-router')();
import { findRole, findTheRole,  addRole, removeRole, roleList, updateRole } from '../app/controller/role'

router.get('/', function (ctx, next) {
  ctx.body = 'this a article response!';
});

router.post('/roleList', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await roleList(reqBody);
});

router.post('/findRole', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await findRole(reqBody);
});

router.post('/findTheRole', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await findTheRole(reqBody);
});

router.post('/addRole', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await addRole(reqBody);
});
router.post('/updateRole', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await updateRole(reqBody);
});
router.post('/removeRole', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await removeRole(reqBody);
});

module.exports = router;