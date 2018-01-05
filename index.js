const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const app = new Koa()
const router = new Router()
const isoline = require('./dist/libs/isoline')

app.use(cors())

app.use(bodyParser(
  {
    formLimit: "5mb",
    onerror: function (err, ctx) {
      ctx.throw('body parse error', 422);
    }
  }
))

router.post('/lhpoint', async (ctx, next) => {
  try {
    let isolineJson = JSON.parse(ctx.request.body.data)
    let lhPoints = isoline.getLHPoints(isolineJson)
    ctx.response.body = JSON.stringify(lhPoints)
  } catch (error) {
    ctx.throw('isoline invalid', 500);
  }
})

app.use(router.routes())


app.listen(3000)