const router = require('koa-router')();
import {createQrcode, fileUp, fileList, removeFile, readFile} from '../app/controller/files'

router.get('/', async (ctx, next) => {
    console.log(ctx);
    let list = await createQrcode(ctx.query.text);
    console.log(list);
    ctx.body = list;
    ctx.res.writeHead(200, {'Content-Type': 'image/png'});
    // ctx.res.end();
});
router.post('/qrImage', async (ctx, next) => {
    console.log(ctx.request.body);
    let reqBody = ctx.request.body;
    let list = await createQrcode(reqBody.text);
    ctx.body = list;
    ctx.res.writeHead(200, {'Content-Type': 'image/png'});
});
router.get('/getImage', async (ctx, next) => {
    console.log(ctx.query.file);
    let list = await readFile(ctx.query.file)
    ctx.body = list;
    if(!list.code) {
        ctx.res.writeHead(200, {'Content-Type': 'image/png'});
    }
});
router.post('/fileUp', async (ctx, next) => {
    console.log(ctx.request.body.files);
    const file = ctx.request.body.files.file;
    let list = await fileUp(file);
    ctx.body = list;
});
router.get('/fileList', async (ctx, next) => {
    let list = await fileList(ctx, next);
    ctx.body = list;
});
router.post('/removeFile', async (ctx, next) => {
    console.log(ctx.request.body);
    let reqBody = ctx.request.body;
    let list = await removeFile(reqBody);
    ctx.body = list;
});

module.exports = router;