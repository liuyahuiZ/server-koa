const router = require('koa-router')();
const index = require('./index');
const users = require('./users');

router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());

module.exports = router;