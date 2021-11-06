import http from "http";
import socketIO from "socket.io";
import socketFile from "./socket.js";

export default function () {
  this.nuxt.hook("render:before", (renderer) => {
    const server = http.createServer(this.nuxt.renderer.app);
    const io = socketIO(server);

    // overwrite nuxt.server.listen()
    let { host, port } = this.nuxt.options.server;
    console.log(`Host is ${host}, Port is ${port}`);
    this.nuxt.server.listen = async () =>
      new Promise((resolve) =>
        server.listen(process.env.PORT || 3000, host || "localhost", resolve)
      );
    // close this server on 'close' event
    this.nuxt.hook("close", () => new Promise(server.close));

    socketFile(io);
  });
}
