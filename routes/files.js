const router = require('koa-router')();
import {createQrcode, fileUp, fileList, removeFile, readFile} from '../app/controller/files'

router.get('/', async (ctx, next) => {
    console.log(ctx);
    ctx.body = await createQrcode(ctx.query.text);
    ctx.res.writeHead(200, {'Content-Type': 'image/png'});
    // ctx.res.end();
});
router.post('/qrImage', async (ctx, next) => {
    console.log(ctx.request.body);
    let reqBody = ctx.request.body;
    ctx.body = await createQrcode(reqBody.text);
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
    ctx.body = await fileUp(file);
});
router.get('/fileList', async (ctx, next) => {
    ctx.body = await fileList(ctx, next);
});
router.del('/removeFile', async (ctx, next) => {
    console.log(ctx.request.body);
    let reqBody = ctx.request.body;
    ctx.body = await removeFile(reqBody);
});

module.exports = router;