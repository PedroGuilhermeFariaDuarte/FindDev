import socketIO from "socket.io";
import calculeDistance from "../formuleRavasini";

const connections = [];
let socket = "";

export function setupWebsocket(server) {
  socket = socketIO(server);
  socket.on("connection", socket => {
    const { latitude, longitude, techs } = socket.handshake.query;
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: techs.split(",")
    });
  });
}

/**
 * @param coordinates Recebe as coordenadas de localizaçãodo usuario cadastrado
 * @param techs Recebe as tecnologias do usuario cadastrado
 */
export function findConnections(coordinates, techs) {
  // Filtra o array global de conexoes
  return connections.filter(connection => {
    // Retorna todos as conexoes que estão no mesmo raio de distancia
    // do novo usuario cadastrado
    return (
      calculeDistance(coordinates, connection.coordinates) < 10 &&
      connection.techs.some(item => techs.includes(item))
    );
  });
}

export function sendMessage(to, message, data) {
  to.forEach(connection => {
    console.log("Send Message", message, connection.id, data);
    socket.to(connection.id).emit(message, data);
  });
}
