var _a, _b, _c;
//  ------------------------------Listening Elements-------------------------------
(_a = document
    .getElementById("resumeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    //  ------------------------------Type Assertion-----------------------------------
    var profilePictureInput = document.getElementById("profilePicture");
    var nameElement = document.getElementById("name");
    var emailElement = document.getElementById("email");
    var phoneElement = document.getElementById("phone");
    var educationElement = document.getElementById("education");
    var experienceElement = document.getElementById("experience");
    var skillsElement = document.getElementById("skills");
    var usernameElement = document.getElementById("username");
    //  ---------------- Check if all form elements are present -----------------
    if (profilePictureInput &&
        nameElement &&
        emailElement &&
        phoneElement &&
        educationElement &&
        experienceElement &&
        skillsElement &&
        usernameElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skills = skillsElement.value;
        var username = usernameElement.value;
        //  ------------------------------ Resume URL -------------------------------
        var uniquePath = "resumes/".concat(username.replace(/\s+/g, "_"), "_cv.html");
        //  ------------------------------Picture Elements-------------------------------
        var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePictureURL = profilePictureFile
            ? URL.createObjectURL(profilePictureFile)
            : "";
        //  ------------------------------Create Resume Output-------------------------------
        var resumeOutput = "\n<h2>Resume</h2>\n  ".concat(profilePictureURL
            ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilePicture\">")
            : "", "\n\n<p><strong>Name:</strong> <span id=\"edit-name class=\"editable\"> ").concat(name_1, " </span></p>\n<p><strong>Email:</strong> <span id=\"edit-email class=\"editable\"> ").concat(email, " </span></p>\n<p><strong>Phone:</strong> <span id=\"edit-phone class=\"editable\"> ").concat(phone, " </span></p>\n\n<h3>Education</h3>\n<p id=\"edit-education class=\"editable>").concat(education, "</p>\n<h3>Experience</h3>\n<p id=\"edit-experience class=\"editable>").concat(experience, "</p>\n<h3>Skills</h3>\n<p id=\"edit-skills class=\"editable>").concat(skills, "</p>\n");
        //  ----------------------------------- Download Link-------------------------------------
        var downloadLink = document.createElement("a");
        downloadLink.href =
            "data:text/html;charset=utf-8," + encodeURIComponent(resumeOutput);
        downloadLink.download = uniquePath;
        downloadLink.textContent = "Download Your 2024 Resume";
        // ------------------------------Shareable Link-------------------------------
        var shareableLink_1 = document.createElement("a");
        shareableLink_1.href = profilePictureURL || "#";
        shareableLink_1.textContent = "Copy Shareable Link";
        shareableLink_1.style.display = "block"; // Display it as a block element
        // Allow the user to copy the URL on click
        shareableLink_1.addEventListener("click", function (event) {
            event.preventDefault();
            navigator.clipboard.writeText(shareableLink_1.href).then(function () {
                alert("Link copied to clipboard!");
            });
        });
        //  ----------------------------------- Conditions-------------------------------------
        var resumeOutputElement = document.getElementById("resumeOutput");
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            makeEditable();
            //  ----------------------------------- Download Link-------------------------------------
            resumeOutputElement.appendChild(downloadLink);
            resumeOutputElement.appendChild(shareableLink_1); // <== Shareable link appended
            resumeOutputElement.style.display = "block";
        }
    }
    else {
        console.error("One Or More Form Elements Are Missing!!!");
    }
});
//  ----------------------------------- Make Editable ------------------------------------
function makeEditable() {
    var editableElements = document.querySelectorAll(".editable");
    editableElements.forEach(function (element) {
        element.addEventListener("click", function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            // -----------------------------------Replace Content-----------------------------------
            if (currentElement.tagName === "p" || currentElement.tagName === "SPAN") {
                var input_1 = document.createElement("input");
                input_1.type = "text";
                input_1.value = currentValue;
                input_1.classList.add("editing-input");
                input_1.addEventListener("blur", function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = "inline";
                    input_1.remove();
                });
                currentElement.style.display = "none";
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}
(_b = document.getElementById('downloadResume')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    // Functionality to download the resume
    alert('Resume downloading...');
});
(_c = document.getElementById('shareLink')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    // Functionality to copy shareable link
    var link = 'https://your-resume-link.com';
    navigator.clipboard.writeText(link);
    alert('Shareable link copied to clipboard!');
});
