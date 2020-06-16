require("node-jsx").install()
const router = require('koa-router')();
const ReactDOMServer = require('react-dom/server')
const React = require('react')

const com = require('../neo/test.js').Component

router.get('/', async function (ctx, next) {
  let result = ReactDOMServer.renderToString(com({name:'test'}));
  console.log(result);
  let element = (`<html><body><div>${result}</div></body></html>`);
  console.log(result);

  ctx.body= element
})
module.exports = router;
