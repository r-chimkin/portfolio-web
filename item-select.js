document.addEventListener("DOMContentLoaded", () => {
  // 1. Double-check these image file extensions match your actual files! (.png vs .jpg)
  const quizData = [
    { badge: "QUIZ 1", score: "Score: 20/20", date: "August 25, 2026", image: "./assets/quiz-1.jpg" },
    { badge: "QUIZ 2", score: "Score: 19/20", date: "MM/DD/YY", image: "quiz2.png" },
    { badge: "QUIZ 3", score: "Score: 20/20", date: "MM/DD/YY", image: "quiz3.png" }
  ];

  const activityData = [
    { badge: "ACTIVITY 1", score: "Score: ", date: "MM/DD/YY", image: "activity1.png" },
    { badge: "ACTIVITY 2", score: "Score:", date: "MM/DD/YY", image: "activity2.png" },
    { badge: "ACTIVITY 3", score: "Score: ", date: "MM/DD/YY", image: "activity3.png" }
  ];

  const examData = [
    { badge: "EXAM 1", score: "Score: ", date: "MM/DD/YY", image: "exam1.png" },
    { badge: "EXAM 2", score: "Score: ", date: "MM/DD/YY", image: "exam2.png" }
  ];

  // Pick the right dataset based on the page's <body data-page="..."> attribute
  let activeData;
  if (document.body.dataset.page === "activity") {
    activeData = activityData;
  } else if (document.body.dataset.page === "exam") {
    activeData = examData;
  } else {
    activeData = quizData; // default / quiz page
  }

  let currentIndex = 0;

  const quizImg = document.getElementById("quiz-image");
  const quizBadge = document.getElementById("quiz-badge");
  const quizScore = document.getElementById("quiz-score");
  const quizDate = document.getElementById("quiz-date");
  const quizCounter = document.getElementById("quiz-counter");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  function updateSelection(index) {
    const data = activeData[index];
    if (!data) return;

    // Direct text updates
    if (quizBadge) quizBadge.textContent = data.badge;
    if (quizScore) quizScore.textContent = data.score;
    if (quizDate) quizDate.textContent = data.date;
    if (quizCounter) quizCounter.textContent = `${index + 1} of ${activeData.length}`;

    // Image update with error check
    if (quizImg) {
      quizImg.src = data.image;
      quizImg.onerror = () => {
        console.error(`Could not find image file: ${data.image}. Make sure it is in the same folder as the HTML file!`);
      };
    }
  }

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

  // Load initial content
  updateSelection(currentIndex);
});