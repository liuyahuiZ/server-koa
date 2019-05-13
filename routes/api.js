const router = require('koa-router')();
const i = 'i am i';
const project = require('../cgiMock/project');
const theproject = require('../cgiMock/theproject');
const projectPage = require('../cgiMock/projectPage');
const menu = require('../cgiMock/menu');
const resconf = require('../cgiMock/resconf');

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
router.post('/menu/GetMenu', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = menu;
});
router.post('/projects', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = project;
});
router.post('/projects/info', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = theproject;
});
router.post('/projects/manage', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = projectPage;
});
router.get('/resconf', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = resconf;
});
router.get('/starter', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = resconf;
});

module.exports = router;
