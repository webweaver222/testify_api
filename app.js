const koa = require('koa')
const router = require('./routes')
const cors = require('@koa/cors');

const sequelize = require('./db')


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  sequelize.sync()



const app = new koa()

app.use(cors({
  origin: 'http://localhost:8000',
  credentials: true
}));


app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', (err, ctx) => {
   console.log(err);
});

app.use(router.routes());
app.use(router.allowedMethods())


  
  app.listen(3000);