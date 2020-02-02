import socketio from "socket.io-client";

class SocketClient {
  constructor() {
    this.socket = this.init();
  }

  init() {
    return socketio("http://localhost:3333", { autoConnect: false });
  }

  connect(latitude, longitude, techs) {
    this.socket.io.opts.query = {
      latitude,
      longitude,
      techs
    };

    this.socket.connect();
  }

  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  subscribeToNewDevs(subcribeFunction) {
    console.log("Ouvindo new-dev", subcribeFunction);
    this.socket.on("new-dev", subcribeFunction);
  }
}

export default new SocketClient();
