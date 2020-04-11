const express = require("express");
// const session = require("express-session");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const io = socketio(server);

const db = require("./models");

// Format Message
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const bot = "Sir Charles III";

// Run when the client connects
io.on("connection", function (socket) {
  socket.on("joinRoom", function (username, room) {
    console.log(username, room);
    const user = userJoin(socket.id, username, room);
    console.log(user);

    socket.join(user.room);

    socket.emit(
      "message",
      formatMessage(bot, `You are now chatting with ${user.username}!`)
    );

    socket.broadcast
      .to(user.room)
      .emit("message", formatMessage(bot, "User has joined the chat"));

    io.to(user.room).emit("roomUsers", {
      room: user.realRoom,
      users: getRoomUsers(user.room),
    });
  });

  console.log("New WS Connection...");

  // Listening for chat message
  socket.on("chatMessage", function (msg) {
    console.log(msg);
    const user = getCurrentUser(socket.id);
    console.log(user);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  socket.on("disconnect", function () {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(bot, `${user.username} has left the chat`)
      );

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

// Passport

// const passport = require("./config/passport");

// app.use(
//   session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// Express Handlebars

const exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

// Static pages

app.use(express.static("public"));

// Routes

require("./routes/html-routes.js")(app);
require("./routes/users-api-routes.js")(app);

// Syncing sequelize models

db.sequelize.sync().then(function () {
  server.listen(PORT, function () {
    console.log(`App listening on PORT ${PORT}`);
  });
});
