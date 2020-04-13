// Adding the link dynamically
var link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("type", "text/css");
link.setAttribute("href", "../../assets/css/styles.css");
document.getElementsByTagName("head")[0].appendChild(link);

// Hiding the love quester button
$(".lovequester").hide();

$.ajax("/api/profile", {
  type: "GET",
}).then(function (data) {
  if (data.lovequester === null) {
    $(".lovequester").show();
  }
});

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

  // Event Listeners
  $(".lovequester-btn").on("click", function () {
    $.ajax(`/api/user/${name}`, {
      type: "GET",
    }).then(function (data) {
      const email = data.email;
      const obj = {
        lovequester: email,
      };
      $.ajax("/api/lovequester", {
        type: "PUT",
        data: obj,
      }).then(function () {
        console.log("successfully updated lovequester!");
      });
    });
  });

  $(".chat-btn").on("click", function () {
    window.location.href = "/chat";
  });
});

function generateProfile(obj) {
  $(".profile").attr("src", obj.picture);
  $(".profile-name").text(`${obj.first_name} ${obj.last_name}`);
  $(".profile-profession").text(obj.occupation);
  $(".para-name").text(`${obj.first_name} ${obj.last_name}`);
  $(".para-email").text(obj.email);
  $(".para-marital").text(obj.marital_status);
}

//Follow Button Effect

$(document).ready(function iniciar() {
  $(".follow").on("click", function () {
    $(".follow").html('<div class="icon-heart"></div>  Made LoveQuester!');
  });
});
