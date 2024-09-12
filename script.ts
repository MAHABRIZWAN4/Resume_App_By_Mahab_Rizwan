//  ------------------------------Listening Elements-------------------------------
document
  .getElementById("resumeForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    //  ------------------------------Type Assertion-----------------------------------
    const profilePictureInput = document.getElementById(
      "profilePicture"
    ) as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const educationElement = document.getElementById(
      "education"
    ) as HTMLInputElement;
    const experienceElement = document.getElementById(
      "experience"
    ) as HTMLInputElement;
    const skillsElement = document.getElementById("skills") as HTMLInputElement;
    const usernameElement = document.getElementById(
      "username"
    ) as HTMLInputElement;

    //  ---------------- Check if all form elements are present -----------------
    if (
      profilePictureInput &&
      nameElement &&
      emailElement &&
      phoneElement &&
      educationElement &&
      experienceElement &&
      skillsElement &&
      usernameElement
    ) {
      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;
      const username = usernameElement.value;

      //  ------------------------------ Resume URL -------------------------------
      const uniquePath = `resumes/${username.replace(/\s+/g, "_")}_cv.html`;

      //  ------------------------------Picture Elements-------------------------------
      const profilePictureFile = profilePictureInput.files?.[0];
      const profilePictureURL = profilePictureFile
        ? URL.createObjectURL(profilePictureFile)
        : "";

      //  ------------------------------Create Resume Output-------------------------------
      const resumeOutput = `
<h2>Resume</h2>
  ${
    profilePictureURL
      ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">`
      : ""
  }

<p><strong>Name:</strong> <span id="edit-name class="editable"> ${name} </span></p>
<p><strong>Email:</strong> <span id="edit-email class="editable"> ${email} </span></p>
<p><strong>Phone:</strong> <span id="edit-phone class="editable"> ${phone} </span></p>

<h3>Education</h3>
<p id="edit-education class="editable>${education}</p>
<h3>Experience</h3>
<p id="edit-experience class="editable>${experience}</p>
<h3>Skills</h3>
<p id="edit-skills class="editable>${skills}</p>
`;

      //  ----------------------------------- Download Link-------------------------------------
      const downloadLink = document.createElement("a");
      downloadLink.href =
        "data:text/html;charset=utf-8," + encodeURIComponent(resumeOutput);
      downloadLink.download = uniquePath;
      downloadLink.textContent = "Download Your 2024 Resume";

      // ------------------------------Shareable Link-------------------------------
      const shareableLink = document.createElement("a");
      shareableLink.href = profilePictureURL || "#";
      shareableLink.textContent = "Copy Shareable Link";
      shareableLink.style.display = "block"; // Display it as a block element

      // Allow the user to copy the URL on click
      shareableLink.addEventListener("click", function (event) {
        event.preventDefault();
        navigator.clipboard.writeText(shareableLink.href).then(() => {
          alert("Link copied to clipboard!");
        });
      });

      //  ----------------------------------- Conditions-------------------------------------
      const resumeOutputElement = document.getElementById("resumeOutput");
      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
      makeEditable();

        //  ----------------------------------- Download Link-------------------------------------
        resumeOutputElement.appendChild(downloadLink);
        resumeOutputElement.appendChild(shareableLink); // <== Shareable link appended

        resumeOutputElement.style.display = "block";
      }
    } else {
      console.error("One Or More Form Elements Are Missing!!!");
    }
  });

//  ----------------------------------- Make Editable ------------------------------------
function makeEditable() {
  const editableElements = document.querySelectorAll(".editable");
  editableElements.forEach((element) => {
    element.addEventListener("click", function () {
      const currentElement = element as HTMLElement;
      const currentValue = currentElement.textContent || "";
      // -----------------------------------Replace Content-----------------------------------
      if (currentElement.tagName === "p" || currentElement.tagName === "SPAN") {
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentValue;
        input.classList.add("editing-input");

        input.addEventListener("blur", function () {
          currentElement.textContent = input.value;
          currentElement.style.display = "inline";
          input.remove();
        });

        currentElement.style.display = "none";
        currentElement.parentNode?.insertBefore(input, currentElement);
        input.focus();
      }
    });
  });
}

