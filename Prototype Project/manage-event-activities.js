// 🔥 เปิด/ปิด sidebar
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("hide");
  document.getElementById("main").classList.toggle("full");
}

// 🔥 เปลี่ยนหน้า
function go(page) {
  window.location.href = page;
}

// 🔥 logout
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

/* ---------------- MODAL ---------------- */

// 🔥 เปิด popup เพิ่มกิจกรรม
function openAddModal() {
  document.getElementById("addModal").style.display = "flex";
}

// 🔥 ปิด popup
function closeAddModal() {
  document.getElementById("addModal").style.display = "none";

  // 🔥 ล้างค่า form
  document.getElementById("eventName").value = "";
  document.getElementById("eventDate").value = "";
  document.getElementById("eventOrg").selectedIndex = 0;
  document.getElementById("eventStatus").selectedIndex = 0;
  document.getElementById("eventLocation").selectedIndex = 0;
  document.getElementById("eventSemester").selectedIndex = 0;
  document.getElementById("eventYear").value = "";
  document.getElementById("eventPublishDate").value = "";
}

// 🔥 คลิกพื้นหลังแล้วปิด
window.onclick = function(e) {
  const modal = document.getElementById("addModal");
  if (e.target === modal) {
    closeAddModal();
  }
};



// 🔥 เก็บ index ตอนแก้ไข
/* ---------------- GLOBAL ---------------- */
let editIndex = -1;


/* ---------------- SAVE EVENT ---------------- */
function saveEvent() {

  const name = document.getElementById("eventName").value;
  const date = document.getElementById("eventDate").value;
  const org = document.getElementById("eventOrg").value;
  const status = document.getElementById("eventStatus").value;

  const location = document.getElementById("eventLocation").value;
  const semester = document.getElementById("eventSemester")?.value || "-";
  const year = document.getElementById("eventYear")?.value || "-";
  const publishDate = document.getElementById("eventPublishDate").value;


    if (
      !name || name.trim() === "" ||
      !date ||
      !org || org === "เลือกหน่วยงาน" ||
      !status || status === "เลือกรูปแบบการเผยแพร่" ||
      !publishDate
    ) {
      Swal.fire({
        icon: "warning",
        title: "กรอกข้อมูลไม่ครบ",
        text: "กรุณากรอกข้อมูลให้ครบทุกช่องที่มี *",
        confirmButtonText: "โอเค"
      });
      return;
    }
    if (year.length !== 4) {
      Swal.fire({
        icon: "warning",
        title: "ปีการศึกษาไม่ถูกต้อง",
        text: "กรุณากรอกปีการศึกษาเป็นตัวเลข 4 หลัก",
        confirmButtonText: "โอเค"
      });
      return;
    }

  const table = document.getElementById("eventTable");

  /* 🔥 ====== EDIT MODE ====== */
  if (editIndex !== -1) {

    const row = table.rows[editIndex + 1];

    row.cells[1].innerHTML = name;
    row.cells[2].innerHTML = location;
    row.cells[3].innerHTML = org;
    row.cells[4].innerHTML = publishDate;
    row.cells[5].innerHTML = status;

    editIndex = -1;

  } else {

    /* 🔥 ====== ADD MODE ====== */
    const row = table.insertRow(-1);

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    const cell7 = row.insertCell(6);

    cell1.innerHTML = "-";
    cell2.innerHTML = name;
    cell3.innerHTML = location;
    cell4.innerHTML = org;
    cell5.innerHTML = publishDate;

    let statusText = "";
    if (status === "เผยแพร่") {
      statusText = "<span class='badge green'>เผยแพร่</span>";
    } else if (status === "รอเผยแพร่") {
      statusText = "<span class='badge yellow'>รอเผยแพร่</span>";
    } else {
      statusText = "<span class='badge red'>ยกเลิก</span>";
    }
    cell6.innerHTML = statusText;

    cell7.innerHTML = `
      <i class="fa-solid fa-pen edit-btn" onclick="editRow(this)"></i>
      <i class="fa-solid fa-trash delete-btn" onclick="deleteRow(this)"></i>
    `;
  }

  closeAddModal();

  /* 🔥 RESET FORM */
  document.getElementById("eventName").value = "";
  document.getElementById("eventDate").value = "";
  document.getElementById("eventOrg").selectedIndex = 0;
  document.getElementById("eventStatus").selectedIndex = 0;
  document.getElementById("eventLocation").value = "";
  document.getElementById("eventPublishDate").value = "";

  Swal.fire({
  title: "บันทึกข้อมูลสำเร็จ",
  icon: "success",
  confirmButtonText: "ตกลง"
});
}


/* ---------------- EDIT ---------------- */
function editRow(btn) {

  Swal.fire({
    title: "ต้องการแก้ไขข้อมูล?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ใช่",
    cancelButtonText: "ยกเลิก"
  }).then((result) => {

    if (result.isConfirmed) {

      const row = btn.parentNode.parentNode;

      const name = row.cells[1].innerText;
      const location = row.cells[2].innerText;
      const org = row.cells[3].innerText;
      const publishDate = row.cells[4].innerText;

      document.getElementById("eventName").value = name;
      document.getElementById("eventLocation").value = location;
      document.getElementById("eventOrg").value = org;
      document.getElementById("eventPublishDate").value = publishDate;

      openAddModal();

      row.remove();
    }
  });
}


/* ---------------- DELETE ---------------- */
function deleteRow(btn) {
  Swal.fire({
    title: "คุณต้องการลบข้อมูล?",
    text: "ลบแล้วจะไม่สามารถกู้คืนได้",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#aaa",
    confirmButtonText: "ลบข้อมูล",
    cancelButtonText: "ยกเลิก"
  }).then((result) => {
    if (result.isConfirmed) {
      const row = btn.parentNode.parentNode;
      row.remove();

      Swal.fire("ลบสำเร็จ!", "", "success");
    }
  });
}

/* ---------------- MODAL ---------------- */
function openAddModal() {
  document.getElementById("addModal").style.display = "flex";
}

function closeAddModal() {
  document.getElementById("addModal").style.display = "none";
}


/* ---------------- แสดงกิจกกรม ค้นหา ใต้ชื่อจัดการ ---------------- */
function filterTable() {

  const filter = document.getElementById("filterStatus").value;
  const search = document.getElementById("searchInput").value.toLowerCase();

  const table = document.getElementById("eventTable");
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {

    const name = rows[i].cells[1].innerText.toLowerCase();
    const status = rows[i].cells[5].innerText;

    let matchStatus = false;
    let matchSearch = false;

    // filter
    if (filter === "all") {
      matchStatus = true;
    } else {
      matchStatus = status.trim() === filter;
    }

    // search
    if (name.includes(search)) {
      matchSearch = true;
    }

    rows[i].style.display = (matchStatus && matchSearch) ? "" : "none";
  }
}
