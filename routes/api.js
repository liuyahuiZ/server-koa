const router = require('koa-router')();
const i = 'i am i';
const project = require('../cgiMock/project');
const theproject = require('../cgiMock/theproject');
const theprojectRich = require('../cgiMock/theprojectRich');
const projectPage = require('../cgiMock/projectPage');
const deleteProject = require('../cgiMock/deleteProject');
const menu = require('../cgiMock/menu');
const resconf = require('../cgiMock/resconf');
const options = require('../cgiMock/options');
const pages = require('../cgiMock/pages');
const heders = require('../cgiMock/headers');

const projectGet = require('../cgiMock/projectGet');
const pageQuery = require('../cgiMock/pageQuery');
const pageConfig = require('../cgiMock/pageConfig');
const details = require('../cgiMock/details');
const table = require('../cgiMock/table');

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
router.post('/projects/rich/info', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = theprojectRich;
});
router.post('/projects/manage', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = projectPage;
});
router.post('/projects/delete', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = deleteProject;
});
router.post('/projects/edit', async (ctx, next) => {
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
router.post('/options', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = options;
});
router.post('/pages', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = pages;
});
router.post('/getHeader', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = heders;
});
router.post('/getBank', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = theproject;
});
router.post('/details', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = details;
});

router.post('/admin/api/project/project_get', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = projectGet;
});

router.post('/admin/api/page/page_qry', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = pageQuery;
});

router.post('/projects/save', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = theproject;
});

router.post('/pte/table', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = table;
});

module.exports = router;
