// Adding the link dynamically
var link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("type", "text/css");
link.setAttribute("href", "../../assets/css/styles.css");
document.getElementsByTagName("head")[0].appendChild(link);

// Search and LoveQuester container stuff
$(".lovequester-container").hide();

$.ajax("/api/profile", {
  type: "GET",
}).then(function (data) {
  if (data.lovequester !== null) {
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

function generateLQ(data) {
  console.log(data);
  const cardDiv = elementGenerator("div", "card");
  const image = elementGenerator("img", "image", data.picture);

  image.attr("style", "width:150px;height:150px");
  const cardBody = elementGenerator("div", "card-body");
  const cardTitle = elementGenerator(
    "h5",
    "card-title",
    "",
    `${data.first_name} ${data.last_name}`
  );
  const para = elementGenerator("p", "card-text", "", data.about_me);
  const link = elementGenerator("a", "btn btn-info", "", "Chat");
  link.attr("href", "/chat");
  cardBody.append(cardTitle, para, link);
  cardDiv.append(image, cardBody);
  $(".lovequester").append(cardDiv);
} // Function to generate lovequester info
