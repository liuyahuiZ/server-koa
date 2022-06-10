const router = require('koa-router')();
const index = require('./index');
const users = require('./users');
const role = require('./role');
const files = require('./files');
const collect = require('./collect');
const wx = require('./wx');
const wxapp = require('./wxapp');
const wxpay = require('./wxpay');
const article = require('./article');
const spider = require('./spider');
const record = require('./record');
const choRecord = require('./choRecord');
const commonType = require('./commonType');
const blockType = require('./blockType');
const banner = require('./banner');
const api = require('./api');
const capi = require('./capi');
const mail = require('./sendMails');
const actions = require('./actions');
const project = require('./project');
const pages = require('./pages');
const accessLog = require('./accessLog');
const messages = require('./messages');
const pagesConfig = require('./pagesConfig');
const busType = require('./busType');
const card = require('./card');
// const ssr = require('./ssr'); //引入的顺序会报bug

router.use('/', index.routes(), index.allowedMethods());
// router.use('/ssr', ssr.routes(), ssr.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/role', role.routes(), role.allowedMethods());
router.use('/files', files.routes(), files.allowedMethods());
router.use('/collect', collect.routes(), collect.allowedMethods());
router.use('/wx', wx.routes(), wx.allowedMethods());
router.use('/wxpay', wxpay.routes(), wxpay.allowedMethods());
router.use('/wxapp', wxapp.routes(), wxapp.allowedMethods());
router.use('/article', article.routes(), article.allowedMethods());
router.use('/accessLog', accessLog.routes(), accessLog.allowedMethods());
router.use('/messages', messages.routes(), messages.allowedMethods());
router.use('/spider', spider.routes(), spider.allowedMethods());
router.use('/record', record.routes(), record.allowedMethods());
router.use('/choRecord', choRecord.routes(), choRecord.allowedMethods());
router.use('/commonType', commonType.routes(), commonType.allowedMethods());
router.use('/blockType', blockType.routes(), blockType.allowedMethods());
router.use('/banner', banner.routes(), banner.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.use('/capi', capi.routes(), capi.allowedMethods());
router.use('/mail', mail.routes(), mail.allowedMethods());
router.use('/actions', actions.routes(), actions.allowedMethods());
router.use('/project', project.routes(), project.allowedMethods());
router.use('/page', pages.routes(), pages.allowedMethods());
router.use('/pageConfig', pagesConfig.routes(), pagesConfig.allowedMethods());
router.use('/card', card.routes(), card.allowedMethods());
router.use('/busType', busType.routes(), busType.allowedMethods());

module.exports = router;
