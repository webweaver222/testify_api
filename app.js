const koa = require("koa");
const router = require("./routes");
const cors = require("@koa/cors");

const sequelize = require("./db");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync();

const app = new koa();

app.use(
  cors({
    //origin: 'http://192.168.1.16:8000',
    origin: "http://localhost:8000",
    credentials: true
  })
);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      error: err.message
    };
    ctx.app.emit("error", err, ctx);
  }
});

app.on("error", (err, ctx) => {
  console.log(err);
});

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(3000);
server.timeout = 62 * 60 * 1000;
