// Functions
function checkDate(dateOB) {
  const date = new Date().getTime() / 1000;
  const birth = new Date(dateOB).getTime() / 1000;
  const difference = date - birth;
  const years = Math.floor(difference / (24 * 60 * 60 * 365));
  if (years < 18) {
    $(".dob-valid").append("You must be at least 18 years old to sign up");
  }
}

$(function() {
  // Event Listeners
  $(".sign-up-form").on("submit", function(e) {
    e.preventDefault();
    // Date
    const year = $(".year")
      .val()
      .trim();
    const month = $(".month")
      .val()
      .trim();
    const day = $(".day")
      .val()
      .trim();

    const dOB = `${year}-${month}-${date}`;

    // Validations
    if (!$(".username-signup").val()) {
      $(".username-valid").append("You must input a username");
    } else if (!".password-signup".val()) {
      $(".password-valid").append("You must input a password");
    } else if ($(".username-signup").val().length < 8) {
      $(".username-valid").append(
        "Your username must be greater than 8 characters"
      );
    } else if ($(".password-signup").val().length < 12) {
      $(".password-valid").append(
        "Your password must be at least 12 characters long"
      );
    } else if (!year) {
      $(".dob-valid").append("You must enter a valid year");
    } else if (!month) {
      $(".dob-valid").append("You must enter a valid month");
    } else if (!day) {
      $(".dob-valid").append("You must enter a valid day");
    }

    checkDate(dOB);

    // User Object
    const user = {
      username: $(".username-signup")
        .val()
        .trim(),
      password: $(".password-signup")
        .val()
        .trim(),
      dateOfBirth: dOB
    };

    // Sending new user to database
    $.ajax("/api/users", {
      type: "POST",
      data: user
    }).then(function() {
      console.log("created new user!");
      window.location.href = "/";
    });
  });
});
