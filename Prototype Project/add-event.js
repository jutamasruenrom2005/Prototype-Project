function uploadClick() {
  document.getElementById("file").click();
}

function saveEvent() {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;

  if (!title || !date) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  alert("บันทึกสำเร็จ 🎉");

  // 👉 กลับหน้า manage
  window.location.href = "manage-event-activities.html";
}