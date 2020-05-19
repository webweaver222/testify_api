const koa = require('koa')
const router = require('./routes')
const cors = require('@koa/cors');

require('./db')



const app = new koa()

app.use(cors({
  origin: 'http://localhost:8000',
  credentials: true
}));

app.use(router.routes());
app.use(router.allowedMethods())


  
  app.listen(3000);