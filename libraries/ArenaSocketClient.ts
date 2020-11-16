import io from "socket.io-client";

const ArenaSocketClient = io("https://gridboard.herokuapp.com");

export default ArenaSocketClient;
