function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("hide");
  document.getElementById("main").classList.toggle("full");
}

// 🔥 เปลี่ยนหน้า
function go(page) {
  window.location.href = page;
}

/* 🔴 LOGOUT */
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// 🔥 modal ลบ
function openDelete() {
  document.getElementById("deleteModal").style.display = "flex";
}

function closeDelete() {
  document.getElementById("deleteModal").style.display = "none";
}

/* ------------------------------------------------------------------------------------------- */
// 🔥 แสดงทั้งหมด ค้นหา ใต้หัวข้อ
const filter = document.getElementById("statusFilter");
const search = document.getElementById("searchInput");

if (filter && search) {
  filter.addEventListener("change", applyFilter);
  search.addEventListener("input", applyFilter);
}
function applyFilter() {
  const statusValue = filter.value;
  const searchValue = search.value.toLowerCase();

  const cards = document.querySelectorAll(".location-card");

  cards.forEach(card => {
    const status = card.getAttribute("data-status");
    const text = card.querySelector(".info").innerText.toLowerCase();

    const matchStatus = (statusValue === "all" || status === statusValue);
    const matchSearch = text.includes(searchValue);

    if (matchStatus && matchSearch) {
      card.style.display = "grid";
    } else {
      card.style.display = "none";
    }
  });
}

/* ------------------------------------------------------------------------------------------- */
// 🔥 ADD LOCATION MODAL popup หน้าเพิ่มสถานที่
/* ---------- MODAL ---------- */
let editTarget = null;

/* ---------- OPEN ---------- */
function openAddModal() {
  document.getElementById("addModal").style.display = "flex";
}

/* ---------- CLOSE ---------- */
function closeAddModal() {
  document.getElementById("addModal").style.display = "none";
  editTarget = null;
}

/* ---------- SAVE ---------- */
function saveLocation() {

  const code = document.getElementById("locCode").value.trim();
  const name = document.getElementById("locName").value.trim();
  const type = document.getElementById("locType").value;
  const capacity = document.getElementById("locCapacity").value.trim();

  let status = "";
  if (document.getElementById("ready").checked) {
    status = "พร้อมใช้งาน";
  } else if (document.getElementById("repair").checked) {
    status = "ปิดปรับปรุง";
  }

  if (!code || !name || !type || !capacity || !status) {
    Swal.fire({
      icon: "warning",
      title: "กรอกข้อมูลไม่ครบ"
    });
    return;
  }

  // 🔥 EDIT
  if (editTarget) {
    Swal.fire({
      title: "ยืนยันการแก้ไข?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ยกเลิก"
    }).then((result) => {
      if (result.isConfirmed) {
        updateCard(editTarget, code, name, type, capacity, status);
        Swal.fire("แก้ไขสำเร็จ", "", "success");
        closeAddModal();
      }
    });

  } else {
    addCard(code, name, type, capacity, status);
    Swal.fire("บันทึกสำเร็จ", "", "success");
    closeAddModal();
  }
}

/* ---------- ADD ---------- */
function addCard(code, name, type, capacity, status) {

  const container = document.querySelector(".location-list");

  let statusClass = status === "พร้อมใช้งาน" ? "green" : "yellow";

  const card = document.createElement("div");
  card.className = "location-card";
  card.setAttribute("data-status", status);

  card.innerHTML = `
    <input type="checkbox">

    <img src="https://picsum.photos/80" class="logo">

    <div class="info">
      <p><b>รหัส :</b> ${code}</p>
      <p><b>${name}</b></p>
      <p>ความจุ ${capacity} คน</p>
    </div>

    <div class="type">
      <span class="badge outline">${type}</span>
    </div>

    <div class="status">
      <span class="badge ${statusClass}">${status}</span>
    </div>

    <div class="actions">
      <i class="fa-solid fa-trash delete"></i>
      <i class="fa-solid fa-pen edit"></i>
    </div>
  `;

  // 👉 ใส่ event ทีหลัง (สำคัญ!)
  card.querySelector(".delete").onclick = function () {
    deleteRow(this);
  };

  card.querySelector(".edit").onclick = function () {
    editRow(this);
  };

  container.appendChild(card);
}

/* ---------- EDIT ---------- */
function editRow(btn) {

  const row = btn.closest(".location-card");
  editTarget = row;

  document.getElementById("locCode").value =
    row.querySelector(".info p:nth-child(1)").innerText.replace("รหัส :", "").trim();

  document.getElementById("locName").value =
    row.querySelector(".info p:nth-child(2)").innerText;

  document.getElementById("locCapacity").value =
    row.querySelector(".info p:nth-child(3)").innerText
      .replace("ความจุ ", "")
      .replace(" คน", "");

  // 🔥 เพิ่มตรงนี้
  const type = row.querySelector(".type span").innerText;
  document.getElementById("locType").value = type;

  const status = row.getAttribute("data-status");

  document.getElementById("ready").checked = (status === "พร้อมใช้งาน");
  document.getElementById("repair").checked = (status === "ปิดปรับปรุง");

  openAddModal();
}

/* ---------- UPDATE ---------- */
function updateCard(row, code, name, type, capacity, status) {

  let statusClass = status === "พร้อมใช้งาน" ? "green" : "yellow";

  row.querySelector(".info").innerHTML =
    "<p><b>รหัส :</b> " + code + "</p>" +
    "<p><b>" + name + "</b></p>" +
    "<p>ความจุ " + capacity + " คน</p>";

  row.querySelector(".type").innerHTML =
    "<span class='badge outline'>" + type + "</span>";

  row.querySelector(".status").innerHTML =
    "<span class='badge " + statusClass + "'>" + status + "</span>";

  row.setAttribute("data-status", status); // 🔥 สำคัญ
}


/* ---------- DELETE ---------- */
function deleteRow(btn) {

  const row = btn.closest(".location-card");

  Swal.fire({
    title: "คุณต้องการลบข้อมูล?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ลบข้อมูล",
    cancelButtonText: "ยกเลิก"
  }).then((result) => {

    if (result.isConfirmed) {
      row.remove();
      Swal.fire("ลบสำเร็จ!", "", "success");
    }

  });
}

/* ---------- ให้เลือก พร้อมใช้งาน ปิดปรับปรุงแค่ 1 ---------- */
document.getElementById("ready").onclick = function () {
  document.getElementById("repair").checked = false;
};

document.getElementById("repair").onclick = function () {
  document.getElementById("ready").checked = false;
};