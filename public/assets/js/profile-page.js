$(function () {
  // Getting the user's information
  const url = window.location.href;
  const arr = url.split("/");
  const name = arr[arr.length - 1];
  $.ajax(`/api/user/${name}`, {
    type: "GET",
  }).then(function (data) {
    console.log(data);
    generateProfile(data);
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
  $(".profile").attr("src", obj.picture);
  $(".profile-name").text(`${obj.first_name} ${obj.last_name}`);
  $(".profile-profession").text(obj.occupation);
  $(".para-name").text(`${obj.first_name} ${obj.last_name}`);
  $(".para-email").text(obj.email);
  $(".para-marital").text(obj.marital_status);
}
