const router = require('koa-router')();
const index = require('./index');
const users = require('./users');
const files = require('./files');
const collect = require('./collect');
const wx = require('./wx');
const wxapp = require('./wxapp');
const wxpay = require('./wxpay');
const article = require('./article');
const spider = require('./spider');
const record = require('./record');
const commonType = require('./commonType');
const blockType = require('./blockType');
const api = require('./api');
const capi = require('./capi');
const mail = require('./sendMails');
const actions = require('./actions');
const project = require('./project');
const pages = require('./pages');
const pagesConfig = require('./pagesConfig');
const ssr = require('./ssr'); //引入的顺序会报bug

router.use('/', index.routes(), index.allowedMethods());
router.use('/ssr', ssr.routes(), ssr.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/files', files.routes(), files.allowedMethods());
router.use('/collect', collect.routes(), collect.allowedMethods());
router.use('/wx', wx.routes(), wx.allowedMethods());
router.use('/wxpay', wxpay.routes(), wxpay.allowedMethods());
router.use('/wxapp', wxapp.routes(), wxapp.allowedMethods());
router.use('/article', article.routes(), article.allowedMethods());
router.use('/spider', spider.routes(), spider.allowedMethods());
router.use('/record', record.routes(), record.allowedMethods());
router.use('/commonType', commonType.routes(), commonType.allowedMethods());
router.use('/blockType', blockType.routes(), blockType.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.use('/capi', capi.routes(), capi.allowedMethods());
router.use('/mail', mail.routes(), mail.allowedMethods());
router.use('/actions', actions.routes(), actions.allowedMethods());
router.use('/project', project.routes(), project.allowedMethods());
router.use('/page', pages.routes(), pages.allowedMethods());
router.use('/pageConfig', pagesConfig.routes(), pagesConfig.allowedMethods());

module.exports = router;
