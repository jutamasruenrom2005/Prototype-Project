let selectedRole = ""; // ❗ ยังไม่เลือกตอนแรก

function setRole(role) {
  selectedRole = role;

  const adminBtn = document.getElementById("adminBtn");
  const staffBtn = document.getElementById("staffBtn");

  adminBtn.classList.remove("active");
  staffBtn.classList.remove("active");

  if (role === "admin") {
    adminBtn.classList.add("active");
  } else {
    staffBtn.classList.add("active");
  }
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!selectedRole) {
    errorMsg.innerText = "กรุณาเลือกประเภทผู้ใช้งาน";
    return;
  }

  if (username === "" || password === "") {
    errorMsg.innerText = "กรุณากรอกข้อมูลให้ครบ";
    return;
  }

  const users = [
    { username: "admin", email: "admin@gmail.com", password: "1234", role: "admin" },
    { username: "staff", email: "staff@gmail.com", password: "1234", role: "staff" }
  ];

  const user = users.find(u => 
    (u.username === username || u.email === username) &&
    u.password === password &&
    u.role === selectedRole
  );

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));

    if (user.role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "staff-dashboard.html";
    }

  } else {
    errorMsg.innerText = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
  }
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}