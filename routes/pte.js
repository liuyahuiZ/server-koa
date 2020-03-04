const router = require('koa-router')();
const i = 'i am i';
const menu = require('../cgiMock/menu');
const pageConfig = require('../cgiMock/pageConfig');

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title 123'
  };
  console.log('koa2 title 123');

  await ctx.render('index', {
  });
})

router.get('/menu/GetMenu', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = menu;
});
router.post('/admin/api/pageConfig/pageConfig_qry', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = pageConfig;
});

module.exports = router;
