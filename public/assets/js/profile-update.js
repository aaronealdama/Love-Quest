// Cloudinary Set Up
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dm8lr2gza/upload";
const CLOUDINARY_UPLOAD_PRESET = "ximakshh";

$(function () {
  $.ajax("/api/profile", {
    type: "GET",
  }).then(function (data) {
    generateInfo(data);
  });

  // Event Listeners

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

  // Form submission event
  $(".profile-update").on("submit", function (e) {
    e.preventDefault();
    // Profile object
    const profile = {
      first_name: $(".firstname").val().trim(),
      last_name: $(".lastname").val().trim(),
      name: `${$(".firstname").val().trim()}${$(".lastname").val().trim()}`,
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
      has_kids: stringConv($(".has-kids").val().trim()),
      wants_kids: stringConv($(".wants-kids").val().trim()),
      smoker: stringConv($(".smoker").val().trim()),
      drinker: stringConv($(".drinker").val().trim()),
      about_me: $(".about-me").val().trim(),
    };

    // Ajax put request
    $.ajax("/api/update/profile", {
      type: "PUT",
      data: profile,
    }).then(function () {
      console.log("successfully updated profile!");
      window.location.href = "/homepage";
    });
  });
});

// Functions
function generateInfo(data) {
  $(".firstname").val(data.first_name);
  $(".lastname").val(data.last_name);
  $(".email").val(data.email);
  $(".city").val(data.city);
  $(".state").val(data.state);
  $(".zipcode").val(data.zip);
  $(".birthday").val(data.birthday);
  $(".marital-status").val(data.marital_status);
  $(".sex").val(data.sex);
  $(".desire").val(data.desire);
  $(".height").val(data.height);
  $(".education").val(data.education);
  $(".occupation").val(data.occupation);
  $(".annual-income").val(data.annual_income);
  $(".religion").val(data.religion);
  $(".ethnicity").val(data.ethnicity);
  $(".body-type").val(data.body_type);
  $(".has-kids").val(booleanConv(data.has_kids));
  $(".wants-kids").val(booleanConv(data.wants_kids));
  $(".drinker").val(booleanConv(data.drinker));
  $(".smoker").val(booleanConv(data.smoker));
  $(".about-me").val(data.about_me);
  $(".interests").val(data.interests);
} // Generates the user's information

function booleanConv(bool) {
  if (bool === false) return "NO";
  return "YES";
} // Converts booleans to yes or no strings

function stringConv(str) {
  if (str.toLowerCase() === "no") return false;
  return true;
} // Converts strings into booleans
