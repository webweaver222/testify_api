const koa = require("koa");
const http = require("http");
const router = require("./routes");
const cors = require("@koa/cors");
var events = require("events");

const sequelize = require("./db");
const { verifyOrigin } = require("./resorses/utils");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync();

const app = new koa();

app.use(
  cors({
    credentials: true,
    origin: (ctx) => verifyOrigin(ctx)(["http://localhost:8000"]),
  })
);

app.use(async (ctx, next) => {
  try {
    ctx.state.io = io;
    ctx.state.ee = new events.EventEmitter();
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      error: err.message,
    };
    ctx.app.emit("error", err, ctx);
  }
});

app.on("error", (err, ctx) => {
  console.log(err);
});

app.use(router.routes());
app.use(router.allowedMethods());

const server = http.createServer(app.callback());

server.listen(process.env.PORT || 3000);

const io = require("socket.io")(server);

require("./socketEvents")(io);
