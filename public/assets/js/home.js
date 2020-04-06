$(function() {
  $(".login-button").on("click", function() {
    console.log("hi");
    window.location.href = "/login";
  });

  $(".signup-button").on("click", function() {
    console.log("hello");
    window.location.href = "/signup";
  });
});
