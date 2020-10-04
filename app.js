const koa = require("koa");
const http = require("http");
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
    ctx.state.io = io;
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

const server = http.createServer(app.callback());

server.listen(process.env.PORT || 3000);

const io = require("socket.io")(server);

io.sockets.on("connection", function(socket) {
  socket.on("join", function(data) {
    socket.join(data.exam_id); // We are using room of socket io
    console.log(`${data.exam_id} started...`);
  });

  socket.on("disconnect", function() {
    console.log(`${socket.handshake.address} just closed connection`);
  });
});

//const server = app.listen(3000);
//server.timeout = 62 * 60 * 1000;
