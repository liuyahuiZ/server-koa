const router = require('koa-router')();
import {getPage} from '../app/controller/spider'

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});
router.get('/getPage', async (ctx, next) => {
  ctx.body = await getPage(ctx, next);
});

module.exports = router;
