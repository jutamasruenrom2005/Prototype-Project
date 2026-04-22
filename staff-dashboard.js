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

/* 🔴 CHART */
window.onload = function () {

  // 🔴 BAR CHART
  const ctx1 = document.getElementById('barChart');

  if (ctx1) {
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.'],
        datasets: [{
          label: 'จำนวนกิจกรรม',
          data: [5, 8, 12, 6],
          backgroundColor: '#c0392b'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // 🔵 DONUT CHART
  const ctx2 = document.getElementById('donutChart');

  if (ctx2) {
    new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: ['เผยแพร่แล้ว', 'รอเผยแพร่'],
        datasets: [{
          data: [10, 5],
          backgroundColor: ['#4caf50', '#ff9800']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

};
