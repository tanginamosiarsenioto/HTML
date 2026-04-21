let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// Modal elements
const modal = document.getElementById("loginModal");
const getStartedBtns = document.querySelectorAll(".nav-btn, .btn"); 
const closeBtn = document.querySelector(".modal .close");

// Forms
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const forgotForm = document.getElementById("forgotForm");

// Links
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");
const forgotPassword = document.getElementById("forgotPassword");
const backToLogin = document.getElementById("backToLogin");

// Open modal when GET STARTED clicked
getStartedBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    forgotForm.style.display = "none";
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Switch to Signup
showSignup.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  signupForm.style.display = "block";
  forgotForm.style.display = "none";
});

// Switch to Login
showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.style.display = "none";
  loginForm.style.display = "block";
  forgotForm.style.display = "none";
});

// Switch to Forgot Password
forgotPassword.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  signupForm.style.display = "none";
  forgotForm.style.display = "block";
});

// Back to Login from Forgot
backToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  forgotForm.style.display = "none";
  loginForm.style.display = "block";
});

// Password toggle function
function setupPasswordToggle(inputId, toggleId) {
  const input = document.getElementById(inputId);
  const toggle = document.getElementById(toggleId);

  toggle.addEventListener("click", () => {
    if (input.type === "password") {
      input.type = "text";
      toggle.classList.remove("bx-show");
      toggle.classList.add("bx-hide");
    } else {
      input.type = "password";
      toggle.classList.remove("bx-hide");
      toggle.classList.add("bx-show");
    }
  });
}

// Apply to login form
setupPasswordToggle("loginPassword", "toggleLoginPassword");

// You can repeat for signup form:
// setupPasswordToggle("signupPassword", "toggleSignupPassword");

// Payment modal elements
const paymentModal = document.getElementById("paymentModal");
const paymentForm = document.getElementById("paymentForm");
const planSelected = document.getElementById("planSelected");
const paymentMessage = document.getElementById("paymentMessage");

// Find all Join Now buttons
const joinBtns = document.querySelectorAll(".box a");

// Open payment modal when Join Now clicked
joinBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const planName = btn.closest(".box").querySelector("h3").textContent;
    planSelected.value = planName;
    paymentModal.style.display = "block";
    paymentMessage.textContent = ""; // clear old messages
  });
});

// Close payment modal
const closeBtns = document.querySelectorAll(".modal .close");
closeBtns.forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    paymentModal.style.display = "none";
  });
});

// Close when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === paymentModal) {
    paymentModal.style.display = "none";
  }
});

// Handle payment form submit
paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const method = document.getElementById("paymentMethod").value;

  if (method === "") {
    paymentMessage.textContent = "Please select a payment method.";
    paymentMessage.style.color = "red";
  } else if (method === "paypal") {
    paymentMessage.textContent = "Redirecting to PayPal...";
    paymentMessage.style.color = "var(--main-color)";
    // TODO: integrate PayPal API or redirect here
  } else if (method === "credit") {
    paymentMessage.textContent = "Credit Card payment coming soon.";
    paymentMessage.style.color = "var(--main-color)";
  }
});

// Profile Code
const profileIcon = document.querySelector(".profile-icon i");
const dropdown = document.querySelector(".profile-icon .dropdown");

profileIcon.addEventListener("click", () => {
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Close dropdown when clicking outside
window.addEventListener("click", (e) => {
  if (!profileIcon.parentElement.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

// ===== USER AUTH WITH LOCALSTORAGE =====

// Signup
document.querySelector("#signupForm form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = e.target[0].value;
  const email = e.target[1].value;
  const password = e.target[2].value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.username === username)) {
    alert("Username already exists!");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("User created successfully!");
});

// Login
document.querySelector("#loginForm form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    alert("Welcome " + user.username);
    showProfile(user.username);
    document.getElementById("loginModal").style.display = "none";
  } else {
    alert("Invalid credentials!");
  }
});


// Show Profile Icon
function showProfile(username) {
  const profileIcon = document.querySelector(".profile-icon");
  profileIcon.style.display = "inline-block";

  // Toggle dropdown
  const icon = profileIcon.querySelector("i");
  const dropdown = profileIcon.querySelector(".dropdown");
  icon.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    alert("Logged out!");
    profileIcon.style.display = "none";
  });

  // View Profile
  document.getElementById("viewProfile").addEventListener("click", () => {
    alert("Profile: " + username);
  });
}

// Handle Messages click
document.getElementById("messagesBtn").addEventListener("click", (e) => {
  e.preventDefault();
  alert("No new messages right now!"); 
  // Later you can replace this with a modal or redirect to a messages page
});

function showProfile(username) {
  const profileIcon = document.querySelector(".profile-icon");
  profileIcon.style.display = "inline-block";

  // Toggle dropdown
  const icon = profileIcon.querySelector("i");
  const dropdown = profileIcon.querySelector(".dropdown");
  icon.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    alert("Logged out!");
    profileIcon.style.display = "none";
  });

  // View Profile
  document.getElementById("viewProfile").addEventListener("click", (e) => {
    e.preventDefault();
    alert("Profile: " + username);
  });

  // Messages
  document.getElementById("messagesBtn").addEventListener("click", (e) => {
    e.preventDefault();
    alert("No new messages right now!");
  });
}

// Handle login form submit
document.getElementById("loginFormElement").addEventListener("submit", function(e) {
  e.preventDefault(); // stop page reload

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  // Simple demo check (replace with real backend later)
  if (username === "admin" && password === "1234") {
    alert("Login successful! Welcome " + username);
    showProfile(username); // show profile dropdown
    document.getElementById("loginModal").style.display = "none"; // close modal
  } else {
    alert("Invalid username or password. Try again!");
  }
});

// Toggle password visibility
document.getElementById("toggleLoginPassword").addEventListener("click", function() {
  const passwordInput = document.getElementById("loginPassword");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    this.classList.replace("bx-show", "bx-hide");
  } else {
    passwordInput.type = "password";
    this.classList.replace("bx-hide", "bx-show");
  }
});

// Demo user accounts
const users = [
  { username: "admin", password: "1234" },
  { username: "heneralthird@gmail.com", password: "mypassword" },
  { username: "gymrat", password: "fitness123" }
];

// Handle login form submit
document.getElementById("loginFormElement").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  // Check against demo accounts
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    alert("Login successful! Welcome " + username);
    showProfile(username); // show profile dropdown
    document.getElementById("loginModal").style.display = "none"; // close modal
  } else {
    alert("Invalid username or password. Try again!");
  }
});

// Toggle password visibility
document.getElementById("toggleLoginPassword").addEventListener("click", function() {
  const passwordInput = document.getElementById("loginPassword");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    this.classList.replace("bx-show", "bx-hide");
  } else {
    passwordInput.type = "password";
    this.classList.replace("bx-hide", "bx-show");
  }
});

