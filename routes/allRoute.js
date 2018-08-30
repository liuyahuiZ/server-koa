const router = require('koa-router')();
const index = require('./index');
const users = require('./users');
const files = require('./files');
const collect = require('./collect');
const wx = require('./wx');
const wxapp = require('./wxapp');
const wxpay = require('./wxpay');
const ocr = require('./ocr');
const article = require('./article');
const spider = require('./spider');

router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/files', files.routes(), files.allowedMethods());
router.use('/collect', collect.routes(), collect.allowedMethods());
router.use('/wx', wx.routes(), wx.allowedMethods());
router.use('/wxpay', wxpay.routes(), wxpay.allowedMethods());
router.use('/wxapp', wxapp.routes(), wxapp.allowedMethods());
router.use('/ocr', ocr.routes(), ocr.allowedMethods());
router.use('/article', article.routes(), article.allowedMethods());
router.use('/spider', spider.routes(), spider.allowedMethods());

module.exports = router;
