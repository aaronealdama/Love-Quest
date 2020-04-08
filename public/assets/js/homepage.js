$(function () {
  // Event Listeners
  $(".search").on("submit", function (e) {
    e.preventDefault();
    window.location.href = "/search";
  });
});
