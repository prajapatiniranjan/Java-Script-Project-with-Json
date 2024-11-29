const form = document.querySelector("#indexForm");
const indexButton = document.querySelector("#indexButton");

const API_URL = "http://localhost:3000/users";

indexButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  if (password !== confirmPassword) {
    alert("Password not matched. Please try again.");
    return;
  }

  const userData = { name, email, password };

  try {
    // Using async/await to handle the fetch request
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      alert("Sign up successful! Data has been saved.");
      form.reset();
      window.location.href = "login.html"; // Redirect to login page after successful sign-up
    } else {
      alert("Failed to save data. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while saving the data.");
  }
});
