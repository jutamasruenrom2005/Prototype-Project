const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");

toggle.addEventListener("click", () => {
  const type = password.type === "password" ? "text" : "password";
  password.type = type;

  toggle.classList.toggle("fa-eye");
  toggle.classList.toggle("fa-eye-slash");
});

function login() {
  // ไม่เช็คอะไร (prototype)
  window.location.href = "dashboard.html";
}