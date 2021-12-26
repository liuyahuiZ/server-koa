import {createQrcode, getImage, createPersonPic} from '../app/controller/files'
const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    console.log(ctx);
    ctx.body = await createQrcode(ctx.query.text);
    ctx.res.writeHead(200, {'Content-Type': 'image/png'});
    // ctx.res.end();
});


router.post('/createPersonPic', async (ctx, next) => {
  let reqBody = ctx.request.body;
  console.log('reqBody', reqBody)
  ctx.body = await createPersonPic(reqBody.data);
});

router.get('/getPersonPic', async (ctx, next) => {
  let query = ctx.query;
  console.log(ctx.query);
  ctx.body = await getImage(`uploads/${query.imgName}.png`);
  ctx.res.writeHead(200, {'Content-Type': 'image/png'});
});

router.get('/createPersonPic', async (ctx, next) => {
  // let reqBody = ctx.request.body;
  const config = {
    name: '刘强东',
    sex: '女',
    nation: '汉',
    year: '2002',
    mon: '2',
    day: '03',
    org: '喵喵县公安局',
    validTerm: '2014.01.27-2019.01.27',
    addr: '喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵喵',
    idn: '371100197308161831',
    avatar: '/assest/images/avatar.png'
  }
  ctx.body = await createPersonPic(config);
  ctx.res.writeHead(200, {'Content-Type': 'image/png'});
});

module.exports = router;