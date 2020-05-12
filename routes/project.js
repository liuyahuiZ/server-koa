const router = require('koa-router')();
import { projectList, projectMenu, projectDetail, createProject, updateProject, mkCommit, removeProject} from '../app/controller/project'

router.get('/', function (ctx, next) {
  ctx.body = 'this a article response!';
});

router.post('/project_menu', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log('reqBody', reqBody);
  ctx.body = await projectMenu(reqBody.data, next);
});

router.post('/project_qry', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log('reqBody', reqBody);
  ctx.body = await projectList(reqBody.data);
});

router.post('/project_get', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log('reqBody', reqBody);
  ctx.body = await projectDetail(reqBody.data, next);
});

router.post('/project_add', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await createProject(reqBody.data);
});

router.post('/project_modify', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await updateProject(reqBody.data);
});


router.post('/mkCommit', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log(reqBody);
  ctx.body = await mkCommit(reqBody);
});

router.post('/project_delete', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await removeProject(reqBody.data);
});

module.exports = router;