const router = require('koa-router')();
const index = require('./index');
const users = require('./users');
const files = require('./files');

router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/files', files.routes(), files.allowedMethods());

module.exports = router;