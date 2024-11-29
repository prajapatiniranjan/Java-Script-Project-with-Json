const loginForm = document.querySelector(".login-form");
const API_URL = "http://localhost:3000/users";

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent form submission

  const formData = new FormData(loginForm);
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch(API_URL);
  const users = await response.json();

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    // Store user name and login time in data
    data.setItem(
      "loggedInUser",
      JSON.stringify({
        name: user.name,
        loginTime: new Date().toLocaleString(),
      })
    );

    alert("Login successful!");
    window.location.href = "dashboard.html"; // Navigate to dashboard
  } else {
    alert("Invalid email or password. Please try again or sign up.");
  }
});
