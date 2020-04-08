// Functions
function checkDate(dateOB) {
    const date = new Date().getTime() / 1000;
    const birth = new Date(dateOB).getTime() / 1000;
    const difference = date - birth;
    const years = Math.floor(difference / (24 * 60 * 60 * 365));
    if (years < 18) {
        $(".dob-valid").append("You must be at least 18 years old to sign up");
        return false;
    } else if (years >= 18) {
        return true;
    }
    $(".dob-valid").append("Please information in valid format");
}

$(function() {
    // Event Listeners
    $(".sign-up-form").on("submit", function(e) {
        e.preventDefault();
        $(".username-valid").empty();
        $(".password-valid").empty();
        $(".dob-valid").empty();
        $(".ps-valid").empty();

        // Validations
        if (!$(".username-signup").val()) {
            $(".username-valid").append("You must input a username");
            return;
        } else if (!$(".password-signup").val()) {
            $(".password-valid").append("You must input a password");
            return;
        } else if ($(".username-signup").val().length < 8) {
            $(".username-valid").append(
                "Your username must be greater than 8 characters"
            );
            return;
        } else if ($(".password-signup").val().length < 12) {
            $(".password-valid").append(
                "Your password must be at least 12 characters long"
            );
            return;
        } else if (!$(".date-of-birth").val()) {
            $(".dob-valid").append("You must enter a date of birth");
            return;
        } else if ($(".password-signup").val() !== $(".password-confirm").val()) {
            $(".ps-valid").append("Your passwords must match");
            return;
        } else {
            // Age validator
            const bool = checkDate($(".date-of-birth"));

            if (bool === false) return;

            // User Object
            const user = {
                username: $(".username-signup").val().trim(),
                password: $(".password-signup").val().trim(),
                dateOfBirth: $(".date-of-birth").val().trim(),
            };

            // Sending new user to database
            $.ajax("/api/users", {
                type: "POST",
                data: user,
            }).then(function(bool) {
                if (bool === true) {
                    console.log("created new user!");
                    window.location.href = "/login";
                } else if (bool === false) {
                    window.location.href = "/signup-exists";
                }
            });
        }
    });
});