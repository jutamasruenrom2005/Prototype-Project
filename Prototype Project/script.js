// 📱 MOBILE
function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("active");
}

// dropdown
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(drop => {
  const toggle = drop.querySelector(".dropdown-toggle");

  // 🔥 เช็คก่อนว่ามีจริงไหม
  if (toggle) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();

      // ปิดอันอื่นก่อน
      dropdowns.forEach(d => {
        if (d !== drop) d.classList.remove("active");
      });

      // เปิด/ปิดตัวเอง
      drop.classList.toggle("active");
    });
  }
});

// คลิกที่อื่น = ปิดหมด
document.addEventListener("click", () => {
  dropdowns.forEach(d => d.classList.remove("active"));
});



// หน้าค้นหากิจกรรม
// ------------------ 🔴 HERO SLIDER ------------------
const monthMap = {
  "มกราคม": 1,
  "กุมภาพันธ์": 2,
  "มีนาคม": 3,
  "เมษายน": 4,
  "พฤษภาคม": 5,
  "มิถุนายน": 6,
  "กรกฎาคม": 7,
  "สิงหาคม": 8,
  "กันยายน": 9,
  "ตุลาคม": 10,
  "พฤศจิกายน": 11,
  "ธันวาคม": 12
};

// เลื่อนคารูเซลล์
let index = 0;
const slides = document.querySelector('.slides');
const total = document.querySelectorAll('.slide').length;
const dots = document.querySelectorAll('.dot');

function updateSlide() {
  if (!slides) return;

  slides.style.transform = "translateX(-" + (index * 100) + "%)";

  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
}

if (document.querySelector('.next')) {
  document.querySelector('.next').onclick = () => {
    index = (index + 1) % total;
    updateSlide();
  };
}

if (document.querySelector('.prev')) {
  document.querySelector('.prev').onclick = () => {
    index = (index - 1 + total) % total;
    updateSlide();
  };
}

if (slides && total > 0) {
  setInterval(() => {
    index = (index + 1) % total;
    updateSlide();
  }, 4000);
}

// เลื่อนภาพรายละเอียด
const detailSlider = document.getElementById("slider");

if (detailSlider) {
  const nextBtn = document.querySelector(".slide-btn.next");
  const prevBtn = document.querySelector(".slide-btn.prev");

  if (nextBtn && prevBtn) {
    nextBtn.onclick = () => {
      detailSlider.scrollBy({
        left: 300,
        behavior: "smooth"
      });
    };

    prevBtn.onclick = () => {
      detailSlider.scrollBy({
        left: -300,
        behavior: "smooth"
      });
    };
  }
}

// ------------------ 🔴 GO SEARCH (ไปหน้าใหม่) ------------------
function goSearch() {
  const keyword = document.getElementById("searchInput")?.value || "";
  const day = document.getElementById("dayFilter")?.value || "";
  const month = document.getElementById("monthFilter")?.value || "";
  const year = document.getElementById("yearFilter")?.value || "";
  const term = document.getElementById("termFilter")?.value || "";
  const academic = document.getElementById("academicFilter")?.value || "";

  const url = "search.html?keyword=" + keyword +
              "&day=" + day +
              "&month=" + month +
              "&year=" + year +
              "&term=" + term +
              "&academic=" + academic;

  window.location.href = url;
}

// ------------------ 🔴 GET QUERY ------------------
function getQuery() {
  const params = new URLSearchParams(window.location.search);

  return {
    keyword: (params.get("keyword") || "").toLowerCase().trim(),
    day: params.get("day") || "",
    month: params.get("month") || "",
    year: params.get("year") || "",
    term: params.get("term") || "",
    academic: params.get("academic") || ""
  };
}

// ------------------ 🔴 CHECK DATE RANGE ------------------
function isDateInRange(qDay, qMonth, startDay, startMonth, endDay, endMonth) {

  const q = qMonth * 100 + qDay;
  const start = startMonth * 100 + startDay;
  const end = endMonth * 100 + endDay;

  // ไม่ข้ามเดือน
  if (start <= end) {
    return q >= start && q <= end;
  }

  // ข้ามเดือน
  return q >= start || q <= end;
}

// ------------------ 🔴 SHOW RESULTS ------------------
function showResults() {
  const query = getQuery();
  const cards = document.querySelectorAll(".card");

  let count = 0;

  cards.forEach(card => {
    const title = (card.dataset.title || "").toLowerCase();
    const year = card.dataset.year;
    const term = card.dataset.term;
    const academic = card.dataset.academic;

    // 🔥 วันแบบ range
    const startDay = parseInt(card.dataset.startDay);
    const endDay = parseInt(card.dataset.endDay);
    const startMonth = monthMap[card.dataset.startMonth];
    const endMonth = monthMap[card.dataset.endMonth];

    let match = true;

    // 🔍 keyword
    if (query.keyword !== "" && !title.includes(query.keyword)) {
    match = false;
  }

    // 📅 วัน + เดือน
    if (query.day && query.month && query.month !== "เลือกเดือน") {
      const qDay = parseInt(query.day);
      const qMonth = monthMap[query.month];

      if (!isDateInRange(qDay, qMonth, startDay, startMonth, endDay, endMonth)) {
        match = false;
      }
    }

    // 🔥 เลือกแค่เดือน
    else if (query.month && query.month !== "เลือกเดือน") {
      const qMonth = monthMap[query.month];

      if (startMonth !== qMonth && endMonth !== qMonth) {
        match = false;
      }
    }

    // 🔥 เลือกแค่วัน
    else if (query.day) {
      const qDay = parseInt(query.day);

      if (startMonth !== endMonth) {
        match = false;
      } else {
        if (qDay !== startDay) {
          match = false;
        }
      }
    }

    // 📆 ปีจัด
    if (query.year && query.year !== year) match = false;

    // 🎓 ภาค
    if (query.term && query.term !== "เลือกภาคการศึกษา" && query.term !== term) match = false;

    // 🎓 ปีการศึกษา
    if (query.academic && query.academic !== academic) match = false;

    // แสดง/ซ่อน
    if (match) {
      card.style.display = "block";
      count++;
    } else {
      card.style.display = "none";
    }
  });

// 🔢 จำนวนผลลัพธ์พบ/ไม่พบกิจกรรม
const info = document.getElementById("activityCount");
const noResult = document.getElementById("noResult");

if (count === 0) {
  if (info) info.innerText = "พบกิจกรรม 0 รายการ";
  if (noResult) noResult.style.display = "block";

  const pageType = document.body.dataset.page;
  const noResultTitle = document.getElementById("noResultTitle");
  const noResultText = document.getElementById("noResultText");

  if (pageType === "search") {
    noResultTitle.innerText = "ไม่พบกิจกรรมที่ค้นหา";
    noResultText.innerText = "ลองค้นหาด้วยคำอื่นหรือปรับเปลี่ยนตัวกรอง";
  }

  else if (pageType === "department") {
    noResultTitle.innerText = "ไม่พบกิจกรรมของหน่วยงานนี้";
    noResultText.innerText = "ขณะนี้ยังไม่มีข้อมูลกิจกรรม";
  }

  else if (pageType === "all") {
    noResultTitle.innerText = "ยังไม่มีกิจกรรม";
    noResultText.innerText = "โปรดติดตามในอนาคต";
  }

} else {
  if (info) info.innerText = "พบกิจกรรม " + count + " รายการ";
  if (noResult) noResult.style.display = "none";
}
}

document.addEventListener("DOMContentLoaded", function () {
  const pageType = document.body.dataset.page;

  if (pageType === "search" || pageType === "department" || pageType === "all") {
    showResults();
  }
});
