const toggleBtn = document.querySelector(".toggle-btn");
const navbar = document.querySelector(".navbar");

toggleBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

const titleInput = document.querySelector(".title");
const textInput = document.querySelector(".text");
const submitButton = document.querySelector(".submit-btn");

// Function to check if both inputs are empty or not
function checkInputs() {
  // Check if both inputs have values
  if (titleInput.value.trim() == "" || textInput.value.trim() == "") {
    // If both inputs have values, enable the submit button
    submitButton.disabled = true;
  } else {
    // If either input is empty, disable the submit button
    submitButton.disabled = false;
  }
}

// Add event listeners to the title and text inputs
onload = checkInputs()
titleInput.addEventListener("input", checkInputs);
textInput.addEventListener("input", checkInputs);
