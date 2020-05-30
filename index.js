const router = require("express")();
const httpServer = require("http").Server(router);
const socketIOServer = require("socket.io")(httpServer);
const next = require("next");
const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://relati.firebaseio.com"
});

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

socketIOServer.on("connection", socketClient => {

});

admin.firestore().collection("player").doc("test").set({
    "data": serviceAccount
});

nextApp.prepare().then(() => router.get("*", nextHandler));
httpServer.listen(process.env.PORT || 3000);
