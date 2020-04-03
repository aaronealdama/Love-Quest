$(function() {
  $(".login-form").on("submit", function(e) {
    e.preventDefault();

    if (!$(".username-login").val()) {
      $(".username-valid").append("You must insert a username");
    } else if (!$(".password-login").val()) {
      $(".password-valid").append("You must insert a password");
    } else {
      const user = {
        username: $(".username-login")
          .val()
          .trim(),
        password: $(".password-login")
          .val()
          .trim()
      };
      $.post("/api/auth", user, function() {
        console.log("logging in!");
      });
    }
  });
});
