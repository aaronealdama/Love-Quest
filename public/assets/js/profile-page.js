$(function () {
  const url = window.location.href;
  const arr = url.split("/");
  const name = arr[arr.length - 1];
  $.ajax(`/api/user/${name}`, {
    type: "GET",
  }).then(function (data) {
    console.log(data);
    generateProfile(data);
  });

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

// Functions

function elementGenerator(element, classTitle, idTitle, src, text) {
  const tag = $(`<${element}>`);
  tag.attr("class", classTitle);
  tag.attr("id", idTitle);
  tag.attr("src", src);
  tag.text(text);
  return tag;
}

function generateProfile(obj) {
  const image = elementGenerator("image", "img", "profile-image", obj.picture);
  $(".image").append(image);
  $(".header").text(`${obj.first_name} ${obj.last_name}`);
  $(".location").text(`${obj.city}, ${obj.state}`);
  $(".birthdate").text(obj.birthday);
  $(".marital-status").text(obj.marital_status);
  $(".para").text(obj.about_me);
}
