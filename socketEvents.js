const examService = require("./services/examService");

module.exports = function (io) {
  io.sockets.on("connection", function (socket) {
    const client = socket.handshake.address;

    socket.on("start_exam", async function ({ test_id: id }) {
      console.log(`${client} started ${id}`);

      const exam_id = await examService.startExam(id, () =>
        socket.emit("exam_timeout")
      );

      socket.emit("exam_started", { exam_id });
    });

    socket.on("finish_exam", async function (data) {
      await examService.finishExam(data);
      socket.emit("exam_finished");
    });

    socket.on("disconnect", function () {
      console.log(`${client} just closed connection`);
    });
  });
};
