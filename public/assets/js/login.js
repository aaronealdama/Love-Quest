$(function() {
  // Event Listeners
  $(".login-form").on("submit", function(e) {
    e.preventDefault();
    $(".username-valid").empty();
    $(".password-valid").empty();

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
      $.ajax("/api/auth", {
        type: "POST",
        data: user
      }).then(function(boolean) {
        console.log(boolean);
        if (boolean === true) {
          window.location.href = "/profile-signup";
        } else {
          window.location.href = "/login-wrong";
        }
      });
    }
  });
});
