document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submitBtn");

  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const genderSelect = document.getElementById("gender");
  const topicCheckboxes = document.querySelectorAll(".topic");

  // Error message elements
  const usernameError = document.getElementById("usernameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const topicsError = document.getElementById("topicsError");
  const genderError = document.getElementById("genderError");

  // Helper: clear all previous error states
  function clearErrors() {
    [username, email, password, confirmPassword, genderSelect].forEach(
      function (field) {
        field.classList.remove("is-error");
      }
    );
    [
      usernameError,
      emailError,
      passwordError,
      confirmPasswordError,
      topicsError,
      genderError,
    ].forEach(function (el) {
      el.textContent = "";
    });
  }

  // Helper: mark a required text/select field as empty
  function markEmpty(field, errorEl) {
    field.classList.add("is-error");
    errorEl.textContent = "this filed must not be empty";
  }

  function validateForm() {
    clearErrors();
    let isValid = true;

    // Username
    if (username.value.trim() === "") {
      markEmpty(username, usernameError);
      isValid = false;
    }

    // Email
    if (email.value.trim() === "") {
      markEmpty(email, emailError);
      isValid = false;
    }

    // Password
    if (password.value.trim() === "") {
      markEmpty(password, passwordError);
      isValid = false;
    }

    // Confirm Password
    if (confirmPassword.value.trim() === "") {
      markEmpty(confirmPassword, confirmPasswordError);
      isValid = false;
    } else if (confirmPassword.value !== password.value) {
      // Only check mismatch if confirm password is not empty
      confirmPassword.classList.add("is-error");
      confirmPasswordError.textContent =
        "confirmed password mismatched the password";
      isValid = false;
    }

    // Interesting Topics - at least one checked
    const anyChecked = Array.from(topicCheckboxes).some(function (cb) {
      return cb.checked;
    });
    if (!anyChecked) {
      topicsError.textContent = "At least one topic must be selected";
      isValid = false;
    }

    // Gender - must not be the default "--" option
    if (genderSelect.selectedIndex === 0) {
      genderSelect.classList.add("is-error");
      genderError.textContent = "please choose your gender";
      isValid = false;
    }

    return isValid;
  }

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const valid = validateForm();
    if (valid) {
      alert("Form submitted successfully!");
      // form.submit(); // uncomment / adjust if actually submitting somewhere
    }
  });
});
