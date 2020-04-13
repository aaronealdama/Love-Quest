$(function() {
    // Getting profile information
    $.ajax("/api/profile", {
        type: "GET",
    }).then(function(data) {
        $(".welcome").text(`Welcome Back, ${data.first_name}!`);
        $(".about-me").text(data.about_me);
        $(".profile").attr("src", data.picture);
        $(".para-name").text(`${data.first_name} ${data.last_name}`);
        $(".para-email").text(data.email);
        $(".para-marital").text(data.marital_status);
    });
});