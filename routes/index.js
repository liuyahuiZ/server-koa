var router = require('koa-router')();
const i = 'i am i';
router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title 123'
  };
  console.log('koa2 title 123');

  await ctx.render('index', {
  });
})
module.exports = router;
