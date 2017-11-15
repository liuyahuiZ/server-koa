const router = require('koa-router')();
const index = require('./index');
const users = require('./users');
const files = require('./files');
const collect = require('./collect');
const wx = require('./wx');

router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/files', files.routes(), files.allowedMethods());
router.use('/collect', collect.routes(), collect.allowedMethods());
router.use('/wx', wx.routes(), files.allowedMethods());

module.exports = router;
