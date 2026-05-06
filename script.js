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
    if (pageType === "all") {
      initPagination();
    }
  }
});

// ==================== 🔴 PAGINATION ====================
let currentPage = 1;
const itemsPerPage = 15;

function initPagination() {
  const cardContainer = document.getElementById("resultContainer");
  const cards = cardContainer?.querySelectorAll(".card") || [];
  const totalPages = Math.ceil(cards.length / itemsPerPage);

  // ซ่อน cards ทั้งหมดก่อน
  cards.forEach(card => card.style.display = "none");

  // สร้าง pagination buttons
  renderPaginationButtons(totalPages);

  // แสดง page แรก
  showPage(1);
}

function showPage(page) {
  const cardContainer = document.getElementById("resultContainer");
  const cards = cardContainer?.querySelectorAll(".card") || [];
  const totalPages = Math.ceil(cards.length / itemsPerPage);

  // ตรวจสอบ page
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  currentPage = page;

  // คำนวณ index
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // ซ่อน cards ทั้งหมด
  cards.forEach((card, index) => {
    if (index >= startIndex && index < endIndex) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  // อัปเดต pagination buttons
  updatePaginationButtons(page, totalPages);

  // เลื่อนไปด้านบนของ container
  cardContainer?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderPaginationButtons(totalPages) {
  const paginationNumbers = document.getElementById("paginationNumbers");
  if (!paginationNumbers) return;

  paginationNumbers.innerHTML = "";

  // สร้าง max 5 buttons หรือตามจำนวนหน้า
  const maxButtons = Math.min(totalPages, 5);
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  
  if (startPage + maxButtons - 1 > totalPages) {
    startPage = Math.max(1, totalPages - maxButtons + 1);
  }

  for (let i = 0; i < maxButtons; i++) {
    const page = startPage + i;
    const button = document.createElement("button");
    button.textContent = page;
    button.onclick = () => showPage(page);
    
    if (page === currentPage) {
      button.classList.add("active");
    }

    paginationNumbers.appendChild(button);
  }
}

function updatePaginationButtons(page, totalPages) {
  const paginationNumbers = document.getElementById("paginationNumbers");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (paginationNumbers) {
    const buttons = paginationNumbers.querySelectorAll("button");
    buttons.forEach(btn => {
      if (parseInt(btn.textContent) === page) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  if (prevBtn) {
    prevBtn.disabled = page === 1;
  }

  if (nextBtn) {
    nextBtn.disabled = page === totalPages;
  }
}

function previousPage() {
  showPage(currentPage - 1);
}

function nextPage() {
  const cardContainer = document.getElementById("resultContainer");
  const cards = cardContainer?.querySelectorAll(".card") || [];
  const totalPages = Math.ceil(cards.length / itemsPerPage);
  
  if (currentPage < totalPages) {
    showPage(currentPage + 1);
  }
}

// ------------------ 🔴 OPEN DETAIL HELPERS ------------------
function getBreadcrumbMap() {
  return {
    'activities.html': {label: 'กิจกรรมทั้งหมด', href: 'activities.html'},
    'search.html': {label: 'ผลการค้นหา', href: 'search.html'},
    'division-strategic.html': {label: 'ฝ่ายยุทธศาสตร์และพัฒนาองค์กร', href: 'division-strategic.html'},
    'division-admission.html': {label: 'ฝ่ายรับเข้าศึกษาและกิจการพิเศษ', href: 'division-admission.html'},
    'division-smo.html': {label: 'ฝ่ายกิจการนิสิตและพัฒนาอย่างยั่งยืน', href: 'division-smo.html'},
    'division-research.html': {label: 'ฝ่ายวิจัยและบริการวิชาการ', href: 'division-research.html'},
    'division-digital.html': {label: 'ฝ่ายดิจิทัลและสื่อสารองค์กร', href: 'division-digital.html'},
    'division-vitisse.html': {label: 'ฝ่ายวิเทศสัมพันธ์', href: 'division-vitisse.html'},
    'division-academic.html': {label: 'ฝ่ายวิชาการ', href: 'division-academic.html'},
    'dept-me.html': {label: 'ภาควิชาวิศวกรรมเครื่องกลและการผลิต', href: 'dept-me.html'},
    'dept-ee.html': {label: 'ภาควิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์', href: 'dept-ee.html'},
    'dept-ce.html': {label: 'ภาควิชาวิศวกรรมโยธาและสิ่งแวดล้อม', href: 'dept-ce.html'},
    'dept-cis.html': {label: 'ภาควิชาวิทยาการคอมพิวเตอร์และสารสนเทศ', href: 'dept-cis.html'},
    'dept-sc.html': {label: 'ภาควิชาวิทยาศาสตร์ทั่วไป', href: 'dept-sc.html'},
    'dept-office.html': {label: 'สำนักงานเลขานุการคณะ', href: 'dept-office.html'}
  };
}

function openDetail(title, source) {
  const t = title || 'รายละเอียดกิจกรรม';
  const src = source || (document.body?.dataset?.page) || window.location.pathname.split('/').pop();
  const url = 'activity-detail.html?title=' + encodeURIComponent(t) + '&src=' + encodeURIComponent(src);
  window.location.href = url;
}

function openDetailFromCard(el) {
  const card = el.closest?.('.card') || el.parentElement?.closest('.card');
  let title = '';
  if (card) {
    const h = card.querySelector('h3, h2, .card-title');
    title = h ? h.textContent.trim() : (card.dataset.title || 'รายละเอียดกิจกรรม');
  }
  if (!title) title = 'รายละเอียดกิจกรรม';
  const src = (document.body?.dataset?.page) || window.location.pathname.split('/').pop();
  openDetail(title, src);
}

function openDetailFromAnchor(a) {
  const title = a.dataset?.title || prompt('ใส่ชื่อกิจกรรมที่ต้องการดูรายละเอียด:');
  const src = (document.body?.dataset?.page) || window.location.pathname.split('/').pop();
  if (title) openDetail(title, src);
}
