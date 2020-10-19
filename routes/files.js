const router = require('koa-router')();
import {createQrcode, fileUp, fileList, removeFile, readFile, fileDetail, getImage, downFile, importFile} from '../app/controller/files'

router.get('/', async (ctx, next) => {
    console.log(ctx);
    ctx.body = await createQrcode(ctx.query.text);
    ctx.res.writeHead(200, {'Content-Type': 'image/png'});
    // ctx.res.end();
});

router.get('/getFile', async (ctx, next) => {
    console.log(ctx.query.path);
    let list = await getImage(ctx.query.path)
    ctx.body = list;
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
router.get('/getTheImage', async (ctx, next) => {
    console.log('path', ctx.query.path);
    let list = await getImage(ctx.query.path)
    ctx.body = list;
    // if(!list.code) {
    //     ctx.res.writeHead(200, {'Content-Type': 'image/png'});
    // }
});
router.get('/downFile', async (ctx, next) => {
    console.log(ctx.query.text);
    let reqBody = ctx.query;
    ctx.set('Content-Type', 'application/octet-stream')
    ctx.body = await downFile(reqBody.text);
    // ctx.res.writeHead(200, {'Content-Type': 'image/png'});
})
router.get('/importFile', async (ctx, next) => {
    console.log(ctx.query.text);
    let reqBody = ctx.query;
    ctx.body = await importFile(reqBody.text);
    // ctx.res.writeHead(200, {'Content-Type': 'image/png'});
})
router.post('/ImageDetail', async (ctx, next) => {
    let reqBody = ctx.request.body;
    let list = await fileDetail(reqBody.id)
    ctx.body = list;
});
router.post('/fileUp', async (ctx, next) => {
    // console.log(ctx.request.body.fields.userid)
    console.log(ctx.request.body);
    const file = ctx.request.body.files.file;
    // const userid = ctx.request.body.fields.userid;
    ctx.body = await fileUp(file);
});
router.post('/fileList', async (ctx, next) => {
    let reqBody = ctx.request.body;
    ctx.body = await fileList(reqBody, next);
});
router.del('/removeFile', async (ctx, next) => {
    console.log(ctx.request.body);
    let reqBody = ctx.request.body;
    ctx.body = await removeFile(reqBody);
});

module.exports = router;
