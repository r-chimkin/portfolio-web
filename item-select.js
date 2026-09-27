document.addEventListener("DOMContentLoaded", () => {
  const quizData = [
    { badge: "QUIZ 1", score: "Score: 20/20", date: "August 25, 2026", type: "image", images: ["./assets/quiz-1.jpg"] },
    { badge: "QUIZ 2", score: "Score: 19/20", date: "MM/DD/YY", type: "image", images: ["quiz2.png"] },
    { badge: "QUIZ 3", score: "Score: 20/20", date: "MM/DD/YY", type: "image", images: ["quiz3.png"] }
  ];

  // Activities now use PDFs instead of images
  const activityData = [
  { badge: "ACTIVITY 1", score: "Score: ", date: "September 4, 2026", type: "pdf", pdf: "./assets/CUNANAN_Comprehensive-Report_Activity1.pdf", thumbnail: "./assets/act1icon.png" },
  { badge: "ACTIVITY 2", score: "Score:", date: "September 9, 2026", type: "pdf", pdf: "./assets/Cunanan_Activity2-Interview-Guide.pdf", thumbnail: "./assets/act2icon.png" },
  { badge: "ACTIVITY 3", score: "Score: ", date: "MM/DD/YY", type: "pdf", pdf: "./assets/activity3.pdf", thumbnail: "./assets/activity3-thumb.png" }
];

  const examData = [
    { badge: "EXAM 1", score: "Score: ", date: "MM/DD/YY", type: "image", images: ["exam1.png"] },
    { badge: "EXAM 2", score: "Score: ", date: "MM/DD/YY", type: "image", images: ["exam2.png"] }
  ];

  let activeData;
  if (document.body.dataset.page === "activity") {
    activeData = activityData;
  } else if (document.body.dataset.page === "exam") {
    activeData = examData;
  } else {
    activeData = quizData;
  }

  let currentIndex = 0;

  const quizImg = document.getElementById("quiz-image");
  const quizBadge = document.getElementById("quiz-badge");
  const quizScore = document.getElementById("quiz-score");
  const quizDate = document.getElementById("quiz-date");
  const quizCounter = document.getElementById("quiz-counter");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // --- Lightbox elements ---
  const lightbox = document.getElementById("lightbox-overlay");
  const lightboxImg = document.getElementById("lightbox-image");
  const lightboxPdf = document.getElementById("lightbox-pdf");
  const lightboxCounter = document.getElementById("lightbox-counter");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");

  let lightboxImages = [];
  let lightboxIndex = 0;



  function updateSelection(index) {
  const data = activeData[index];
  if (!data) return;

  if (quizBadge) quizBadge.textContent = data.badge;
  if (quizScore) quizScore.textContent = data.score;
  if (quizDate) quizDate.textContent = data.date;
  if (quizCounter) quizCounter.textContent = `${index + 1} of ${activeData.length}`;

  if (quizImg) {
    quizImg.style.cursor = "pointer";
    if (data.type === "pdf") {
      quizImg.src = data.thumbnail;   // <-- now per-item, not shared
      quizImg.alt = "Click to view PDF";
    } else {
      quizImg.src = data.images[0];
      quizImg.alt = data.badge;
    }
    quizImg.onerror = () => {
      console.error(`Could not find file: ${data.type === "pdf" ? data.thumbnail : data.images[0]}`);
    };
  }
}

  function openLightbox(data) {
    if (data.type === "pdf") {
      lightboxImg.style.display = "none";
      lightboxPdf.style.display = "block";
      lightboxPdf.src = data.pdf;
      lightboxCounter.textContent = "";
      lightboxPrev.style.display = "none";
      lightboxNext.style.display = "none";
    } else {
      lightboxPdf.style.display = "none";
      lightboxPdf.src = "";
      lightboxImg.style.display = "block";
      lightboxImages = data.images;
      lightboxIndex = 0;
      showLightboxImage();
    }
    lightbox.classList.add("active");
  }

  function showLightboxImage() {
    lightboxImg.src = lightboxImages[lightboxIndex];
    lightboxCounter.textContent = `${lightboxIndex + 1} of ${lightboxImages.length}`;
    const multi = lightboxImages.length > 1;
    lightboxPrev.style.display = multi ? "block" : "none";
    lightboxNext.style.display = multi ? "block" : "none";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightboxPdf.src = ""; // stop the PDF from staying loaded in background
  }

  if (quizImg) {
    quizImg.addEventListener("click", () => {
      openLightbox(activeData[currentIndex]);
    });
  }

  if (lightboxPrev) {
    lightboxPrev.onclick = () => {
      lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
      showLightboxImage();
    };
  }

  if (lightboxNext) {
    lightboxNext.onclick = () => {
      lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
      showLightboxImage();
    };
  }

  if (lightboxClose) lightboxClose.onclick = closeLightbox;
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (lightboxPrev.style.display !== "none") {
      if (e.key === "ArrowLeft") lightboxPrev.click();
      if (e.key === "ArrowRight") lightboxNext.click();
    }
  });

  if (nextBtn) {
    nextBtn.onclick = () => {
      currentIndex = (currentIndex + 1) % activeData.length;
      updateSelection(currentIndex);
    };
  }

  if (prevBtn) {
    prevBtn.onclick = () => {
      currentIndex = (currentIndex - 1 + activeData.length) % activeData.length;
      updateSelection(currentIndex);
    };
  }

  updateSelection(currentIndex);
});