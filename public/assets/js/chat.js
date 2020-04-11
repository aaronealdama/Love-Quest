$(function () {
  // Event Listeners
  $(".chat-form").on("submit", function (e) {
    e.preventDefault();
    window.location.href = `/chat/username=${$(".username")
      .val()
      .trim()}/chatroom=${$(".roomname").val().trim()}`;
  });
});
