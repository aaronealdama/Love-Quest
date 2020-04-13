// Outer functions
function booleanConv(str) {
  if (str.toLowerCase() === "no") return false;
  return true;
}

// Cloudinary Set Up
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dm8lr2gza/upload";
const CLOUDINARY_UPLOAD_PRESET = "ximakshh";

$(function () {
  // Profile sign up event listener
  $(".profile-sign-up").on("submit", function (e) {
    e.preventDefault();
    // Validator divs are emptied
    $(".firstname-valid").empty();
    $(".lastname-valid").empty();
    $(".email-valid").empty();
    $(".city-valid").empty();
    $(".state-valid").empty();
    $("zipcode-valid").empty();
    $(".birthday-valid").empty();
    $(".sex-valid").empty();
    $(".marital-status-valid").empty();

    // Validations, if any of these values
    // are empty fills an empty div with text
    if (!$(".firstname").val()) {
      $(".firstname-valid").append("You must input your first name");
      return;
    } else if (!$(".lastname").val()) {
      $(".lastname-valid").append("You must input your last name");
      return;
    } else if (!$(".email").val()) {
      $(".email-valid").append("You must input your email");
      return;
    } else if (!$(".birthday").val()) {
      $(".birthday-valid").append("You must input your birthday");
      return;
    } else if (!$(".sex").val()) {
      $(".sex-valid").append("You must input your gender");
      return;
    } else if (!$(".marital-status").val()) {
      $(".marital-status-valid").append("You must input a marital status");
      return;
    } else if (!$(".city").val()) {
      $(".city-valid").append("You must input a city");
    } else if (!$(".state").val()) {
      $(".state-valid").append("You must input a state");
    } else if (!$(".zipcode").val()) {
      $(".zipcode-valid").append("You must input a zipcode");
    } else {
      // Profile object
      const profile = {
        first_name: $(".firstname").val().trim(),
        last_name: $(".lastname").val().trim(),
        name: `${$(".firstname").val().trim()}${$(".lastname")
          .val()
          .trim()}`.toLowerCase(),
        email: $(".email").val().trim(),
        city: $(".city").val().trim(),
        state: $(".state").val().trim(),
        zip: $(".zipcode").val().trim(),
        birthday: $(".birthday").val().trim(),
        marital_status: $(".marital-status").val().trim(),
        sex: $(".sex").val().trim(),
        desire: $(".desire").val().trim(),
        height: $(".height").val().trim(),
        education: $(".education").val().trim(),
        occupation: $(".occupation").val().trim(),
        annual_income: $(".annual-income").val().trim(),
        religion: $(".religion").val().trim(),
        ethnicity: $(".ethnicity").val().trim(),
        body_type: $(".body-type").val().trim(),
        interests: $(".interests").val().trim(),
        has_kids: booleanConv($(".has-kids").val().trim()),
        wants_kids: booleanConv($(".wants-kids").val().trim()),
        smoker: booleanConv($(".smoker").val().trim()),
        drinker: booleanConv($(".drinker").val().trim()),
        about_me: $(".about-me").val().trim(),
      };
      console.log(profile);
      // Ajax post request
      $.ajax("/api/profiles", {
        type: "POST",
        data: profile,
      }).then(function () {
        console.log("created new profile!");
      });
      // Ajax put request
      $.ajax("/api/update", {
        type: "PUT",
        data: profile,
      }).then(function (boolean) {
        if (boolean === false) {
          $(".email-valid").text("Emails must match!");
        }
        console.log("updated user profile!");
      });
    }
  });

  // Picture submit event
  $(".picture").on("change", function (e) {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    axios({
      url: CLOUDINARY_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: fd,
    })
      .then(function (res) {
        console.log(res.data.secure_url);
        const obj = {
          email: $(".email").val().trim(),
          url: res.data.secure_url,
        };
        $.ajax("/api/picture", {
          type: "PUT",
          data: obj,
        }).then(function () {
          console.log("Successfully saved picture information");
        });
      })
      .catch(function (err) {
        console.error(err);
      });
  });

  // Event Listener for completing sign up
  $(".finish").on("submit", function (e) {
    e.preventDefault();
    window.location.href = "/login";
  });
});
