$(function () {
  // Event Listeners
  $(".chat-form").on("submit", function (e) {
    e.preventDefault();

    // Save this for later if you can figure out the email functionality
    const name = $(".contactname")
      .val()
      .trim()
      .split(" ")
      .join("")
      .toLowerCase();
    const room = $(".roomname").val().trim();

    // Ajax call to get users length
    $.ajax("/api/users/length", {
      type: "GET",
    }).then(function (boolean) {
      if (boolean === true) {
        sendEmail(name, room);
      } else {
        // Window relocation
        window.location.href = `/chat/username=${$(".username")
          .val()
          .trim()}/chatroom=${room}`;
      }
    });
  });
});

// Functions
function sendEmail(name, room) {
  // Ajax call to get profile info
  $.ajax(`/api/user/${name}`, {
    type: "GET",
  }).then(function (contact) {
    // Ajax call to get user info
    $.ajax("/api/profile", {
      type: "GET",
    }).then(function (user) {
      console.log(contact.email, user.email);
      const obj = {
        to: `${contact.email}`,
        user: `${user.first_name} ${user.last_name}`,
        room: room,
      };
      $.ajax("/api/send-email", {
        type: "POST",
        data: obj,
      }).then(function () {
        console.log("sent email successfully!");
        // Window relocation
        window.location.href = `/chat/username=${$(".username")
          .val()
          .trim()}/chatroom=${room}`;
      });
    });
  });
}
