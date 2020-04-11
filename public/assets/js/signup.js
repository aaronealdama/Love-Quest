// Functions
function checkDate(dateOB) {
  const arr = dateOB.split("-");
  let emptyArr = [];
  for (let i = 0; i < arr.length; i++) {
    emptyArr.push(parseInt(arr[i]));
  }
  const date = Date.now() / 1000;
  const birth = new Date(emptyArr[0], emptyArr[1], emptyArr[2]);
  const milliseconds = birth.getTime() / 1000;

  const difference = Math.floor((date - milliseconds) / (60 * 60 * 24 * 365));

  if (difference < 18) {
    $(".dob-valid").append("You must be at least 18 years old to sign up");
    return false;
  } else if (difference >= 18) {
    return true;
  } else {
    $(".dob-valid").append(
      "Please put date of birth information in valid format YYYY-MM-DD"
    );
    return false;
  }
}

$(function () {
  // Event Listeners
  $(".sign-up-form").on("submit", function (e) {
    e.preventDefault();
    $(".username-valid").empty();
    $(".password-valid").empty();
    $(".dob-valid").empty();
    $(".ps-valid").empty();

    // Validations
    if (!$(".username-signup").val()) {
      $(".username-valid").append("You must input a username");
      return;
    } else if (!$(".password-signup").val()) {
      $(".password-valid").append("You must input a password");
      return;
    } else if ($(".username-signup").val().length < 8) {
      $(".username-valid").append(
        "Your username must be greater than 8 characters"
      );
      return;
    } else if ($(".password-signup").val().length < 12) {
      $(".password-valid").append(
        "Your password must be at least 12 characters long"
      );
      return;
    } else if (!$(".date-of-birth").val()) {
      $(".dob-valid").append("You must enter a date of birth");
      return;
    } else if ($(".password-signup").val() !== $(".password-confirm").val()) {
      $(".ps-valid").append("Your passwords must match");
      return;
    } else {
      // Age validator
      const bool = checkDate($(".date-of-birth").val());

      if (bool === false) return;

      // User Object
      const user = {
        username: $(".username-signup").val().trim(),
        password: $(".password-signup").val().trim(),
        date_of_birth: $(".date-of-birth").val().trim(),
      };

      // Sending new user to database
      $.ajax("/api/users", {
        type: "POST",
        data: user,
      }).then(function (bool) {
        if (bool === true) {
          console.log("created new user!");
          window.location.href = "/login";
        } else if (bool === false) {
          window.location.href = "/signup-exists";
        }
      });
    }
  });
});
