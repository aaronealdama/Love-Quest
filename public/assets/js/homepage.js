// Search and LoveQuester container stuff
$(".lovequester-container").hide();

$.ajax("/api/profile", {
  type: "GET",
}).then(function (data) {
  if (data.lovequester !== null && data.lovequester !== "") {
    const lovequester = data.lovequester;
    // Ajax call to get lovequester information
    $.ajax(`/api/profile/${lovequester}`, {
      type: "GET",
    }).then(function (data) {
      generateLQ(data);
      $(".lovequester-container").show();
      $(".search-container").hide();
    });
  }
});

$(function () {
  // Getting profile information
  $.ajax("/api/profile", {
    type: "GET",
  }).then(function (data) {
    $(".welcome").text(`Welcome Back, ${data.first_name}!`);
    $(".about-me").text(data.about_me);
    $(".profile").attr("src", data.picture);
    console.log("hi");
    console.log($(".profile").attr("src"));
    console.log(data.picture);
    $(".para-name").text(`${data.first_name} ${data.last_name}`);
    $(".para-email").text(data.email);
    $(".para-marital").text(data.marital_status);
  });

  // Event Listeners
  $(".profile-edit-btn").on("click", function () {
    window.location.href = "/update-profile";
  });
});

// Functions
function elementGenerator(element, classTitle, src, text) {
  const newElement = $(`<${element}>`);
  newElement.attr("class", classTitle);
  newElement.attr("src", src);
  newElement.text(text);
  return newElement;
}

function generateLQ(data) {
  console.log(data);
  const cardDiv = elementGenerator("div", "card");
  const image = elementGenerator("img", "image", data.picture);
  image.attr("style", "width:217px;height:217px");
  const cardBody = elementGenerator("div", "card-body");
  const cardTitle = elementGenerator(
    "h5",
    "card-title",
    "",
    `${data.first_name} ${data.last_name}`
  );
  cardTitle.attr("style", "color: purple;");
  const para = elementGenerator("p", "card-text", "", data.about_me);
  para.attr("style", "color: rebeccapurple;");
  const link = elementGenerator(
    "a",
    "btn btn-danger remove-lovequester",
    "",
    "Remove LoveQuester"
  );

  cardBody.append(cardTitle, para, link);
  cardDiv.append(image, cardBody);
  $(".lovequester").append(cardDiv);
} // Function to generate lovequester info

function removeLQ() {
  const obj = {
    lovequester: null,
  };
  $.ajax("/api/lovequester", {
    type: "PUT",
    data: obj,
  }).then(function () {
    console.log("removed lovequester");
  });
} // Function sets lovequester to null

// Dynamically generated content event listeners
$(document).on("click", ".remove-lovequester", function () {
  removeLQ();
  $(".lovequester-container").hide();
  $(".search-container").show();
});
