document.addEventListener("DOMContentLoaded", () => {
  const userInfo = JSON.parse(data.getItem("loggedInUser")); // Get user info from data

  // Check if user info exists
  if (userInfo) {
    // Display user name and email
    document.querySelector("#profileName").textContent = userInfo.name;
    document.querySelector(
      "#profileEmail"
    ).textContent = `Email: ${userInfo.email}`;
    document.querySelector("#profileImage").src =
      userInfo.profilePicture || "user-avatar.jpg";

    // Display login time
    document.querySelector(
      ".welcome h1"
    ).textContent = `Welcome, ${userInfo.name}!`;
    document.querySelector(
      ".welcome p"
    ).textContent = `You logged in at ${userInfo.loginTime}`;

    // Handle Edit Profile button click
    const editProfileButton = document.querySelector("#editProfileButton");
    const editProfileForm = document.querySelector(".edit-profile-form");
    const profileCard = document.querySelector(".profile-card");

    editProfileButton.addEventListener("click", () => {
      // Hide profile card and show the edit profile form
      profileCard.style.display = "none";
      editProfileForm.style.display = "block";

      // Populate the form with current user data
      document.querySelector("#newName").value = userInfo.name;
      document.querySelector("#newEmail").value = userInfo.email;
    });

    // Handle profile image preview
    const imageInput = document.querySelector("#newImage");
    const imagePreview = document.querySelector("#imagePreview");

    imageInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.src = e.target.result; // Update the image preview
        };
        reader.readAsDataURL(file);
      }
    });

    // Handle form submission for profile update
    const updateProfileForm = document.querySelector("#updateProfileForm");
    updateProfileForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form from submitting the traditional way

      // Get updated values from the form
      const updatedName = document.querySelector("#newName").value;
      const updatedEmail = document.querySelector("#newEmail").value;
      const updatedImage = imagePreview.src; // Get the updated image

      // Update user info in data
      userInfo.name = updatedName;
      userInfo.email = updatedEmail;
      userInfo.profilePicture = updatedImage; // Store the new image URL
      data.setItem("loggedInUser", JSON.stringify(userInfo));

      // Update the profile on the page
      document.querySelector("#profileName").textContent = userInfo.name;
      document.querySelector(
        "#profileEmail"
      ).textContent = `Email: ${userInfo.email}`;
      document.querySelector("#profileImage").src = userInfo.profilePicture;

      // Hide edit profile form and show the updated profile
      editProfileForm.style.display = "none";
      profileCard.style.display = "block";
    });
  } else {
    // If no user is logged in, redirect to login page
    window.location.href = "login.html";
  }
});
const API_URL = "http://localhost:3000/users"; // Replace this with your actual API endpoint

// Adding event listener to delete account button
document
  .querySelector("#deleteAccountButton")
  .addEventListener("click", async () => {
    const userInfo = JSON.parse(data.getItem("loggedInUser"));

    // Check if user info exists
    if (!userInfo) {
      alert("No user is logged in.");
      return;
    }

    // Log user info to ensure the ID is correct
    console.log(userInfo); // Check if userInfo contains the correct data

    // Confirm delete action
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch(`${API_URL}/${userInfo.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(response); // Log the response object for debugging
        if (response.ok) {
          alert("Account deleted successfully!");
          data.removeItem("loggedInUser"); // Remove user data from data
          window.location.href = "login.html"; // Redirect to login page after deletion
        } else {
          alert("Error deleting account. Please try again.");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        alert(
          "An error occurred while deleting the account. Please try again."
        );
      }
    }
  });
