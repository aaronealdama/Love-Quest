// Get username and room from URL
const arr = window.location.href.split("/");
const username = arr[arr.length - 2];
const room = arr[arr.length - 1];
const userSplit = username.split("=");
const roomSplit = room.split("=");
const realUser = userSplit[1];
const realRoom = roomSplit[1];

// Socket IO stuff
const socket = io();

// Join chatroom
socket.emit("joinRoom", realUser, realRoom);

// Room and users
socket.on("roomUsers", ({ room, users }) => {
  outRoomName(room);
  outputUsers(users);
});

socket.on("message", function (message) {
  outputMessage(message);

  // Scroll down
  document.querySelector(".chat-messages").scrollTop = document.querySelector(
    ".chat-messages"
  ).scrollHeight;
});

// Event Listeners
$(".chat-form").on("submit", function (e) {
  e.preventDefault();
  console.log(e.target.elements[0].value);
  const msg = e.target.elements[0].value;

  // Sending message to server
  socket.emit("chatMessage", msg);

  e.target.elements[0].value = "";
});

// Leave room
$(".leave").on("click", function () {
  window.close();
});

// Functions
function elementGenerator(element, classTitle, idTitle, text) {
  const tag = $(`<${element}>`);
  tag.attr("class", classTitle);
  tag.attr("id", idTitle);
  tag.text(text);
  return tag;
}

function outputMessage(message) {
  const div = elementGenerator("div", "message");
  const userPara = elementGenerator(
    "p",
    "meta",
    "",
    `${message.username} ${message.time}`
  );
  const para = elementGenerator("p", "text", "", message.text);
  div.append(userPara, para);
  $(".chat-messages").append(div);
}

function outRoomName(room) {
  $(".room-name").text(room);
}

function outputUsers(users) {
  $(".users").html(
    `${users.map((user) => `<li>${user.username}</li>`).join("")}`
  );
}
