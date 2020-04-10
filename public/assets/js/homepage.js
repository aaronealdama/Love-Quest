$(function () {
  // Event Listeners
  $(".search").on("submit", function (e) {
    e.preventDefault();
    window.location.href = "/search";
  });
  $(".logout").on("submit", function (e) {
    e.preventDefault();
    window.location.href = "/logout";
  });
  $(".map").on("submit", function (e) {
    e.preventDefault();
    window.location.href = "/map";
  });
});
