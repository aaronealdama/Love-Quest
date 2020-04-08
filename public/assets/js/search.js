// Functions
function booleanConv(str) {
  if (str.toLowerCase === "no") return false;
  return true;
}
// Converts yes/no into booleans

function wordsConv(arr) {
  let emptyArr = [];
  for (let i = 0; i < arr.length; i++) {
    emptyArr.push(arr[i].toLowerCase());
  }
  if (arr.length > 1) {
    var words = emptyArr.join("_");
  } else {
    var words = emptyArr.join("");
  }
  return words;
}
// Converts word options

// Function to generate elements
function elementGenerator(element, classTitle, src, text) {
  const newElement = $(`<${element}>`);
  newElement.attr("class", classTitle);
  newElement.attr("src", src);
  newElement.text(text);
  return newElement;
}

function _arrayBufferToBase64(buffer) {
  var arrayBufferView = new Uint8Array(buffer);
  var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
  var urlCreator = window.URL || window.webkitURL;
  var imageUrl = urlCreator.createObjectURL(blob);
  return imageUrl;
}

// Function that generates the results
// into cards the client can see
function resultCreator(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log("hi");
    const imageURL = _arrayBufferToBase64(arr[i].picture.data);
    console.log(imageURL);
    const cardDiv = elementGenerator("div", "card");
    const image = elementGenerator("img", "image", imageURL);
    const cardBody = elementGenerator("div", "card-body");
    const header = elementGenerator(
      "h5",
      "card-title",
      "",
      `${arr[i].first_name} ${arr[i].last_name}`
    );
    const para = elementGenerator("p", "card-text", "", arr[i].about_me);
    const button = elementGenerator(
      "button",
      "btn btn-primary",
      "",
      "View their profile"
    );
    cardBody.append(header, para, button);
    cardDiv.append(image, cardBody);
    $(".results").append(cardDiv);
  }
}

$(function () {
  // Event Listeners
  $(".search-button").on("click", function () {
    const option = $(".options :selected").text();
    const wordArr = option.split(" ");
    let input = $(".input").val().trim();
    if (input.toLowerCase() === "no") {
      input = booleanConv(input);
    }
    const word = wordsConv(wordArr);
    const obj = {
      option: word,
      value: input,
    };

    // Ajax post request to get information
    $.ajax("/api/users/profiles", {
      type: "POST",
      data: obj,
    }).then(function (data) {
      console.log(data);
      if (data !== []) {
        resultCreator(data);
      }
    });
  });
});
