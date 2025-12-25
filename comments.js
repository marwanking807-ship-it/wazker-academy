const commentsBox = document.getElementById("commentsBox");

// تحميل التعليقات عند فتح الصفحة
document.addEventListener("DOMContentLoaded", loadComments);

function loadComments() {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    commentsBox.innerHTML = "";
    comments.forEach((c, i) => renderComment(c.name, c.text, i));
}

function addComment() {
    const name = document.getElementById("commentName").value.trim();
    const text = document.getElementById("commentText").value.trim();

    if (!name || !text) return;

    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push({ name, text });
    localStorage.setItem("comments", JSON.stringify(comments));

    document.getElementById("commentName").value = "";
    document.getElementById("commentText").value = "";

    loadComments();
}

function renderComment(name, text, index) {
    const div = document.createElement("div");
    div.className = "comment";
    div.innerHTML = `
        <strong>${name}</strong>
        <p>${text}</p>
        <span class="delete-btn" onclick="deleteComment(${index})">🗑️</span>
    `;
    commentsBox.appendChild(div);

}

function deleteComment(index) {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.splice(index, 1);
    localStorage.setItem("comments", JSON.stringify(comments));
    loadComments();
}

const HAS_RATED_KEY = "hasRated";
const RATINGS_KEY = "ratings";

/* منع التقييم أكثر من مرة */
let hasRated = localStorage.getItem(HAS_RATED_KEY);

/* اختيار النجوم */
document.querySelectorAll("#ratingStars span").forEach(star => {
    star.onclick = () => {
        if (hasRated) {
            alert("لقد قمت بالتقييم مسبقًا، شكرًا لك 🌟");
            return;
        }

        const rate = Number(star.dataset.rate);
        saveRating(rate);
        hasRated = true;
        localStorage.setItem(HAS_RATED_KEY, "true");
        lockRating();
    };
});

/* حفظ التقييم */
function saveRating(rate) {
    const ratings = JSON.parse(localStorage.getItem(RATINGS_KEY)) || [];
    ratings.push(rate);
    localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
    calculateAverage();
}

/* حساب المتوسط */
function calculateAverage() {
    const ratings = JSON.parse(localStorage.getItem(RATINGS_KEY)) || [];
    if (ratings.length === 0) return;

    const avg = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
    document.getElementById("averageRating").textContent = avg;
    renderAvgStars(Math.round(avg));
}

/* عرض النجوم للمتوسط */
function renderAvgStars(rate) {
    const box = document.getElementById("avgStars");
    box.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.textContent = "★";
        if (i <= rate) star.classList.add("active");
        box.appendChild(star);
    }
}

/* قفل التقييم بعد التصويت */
function lockRating() {
    document.querySelectorAll("#ratingStars span").forEach(star => {
        star.style.cursor = "default";
        star.style.opacity = "0.5";
    });
}

/* عند فتح الصفحة */
calculateAverage();
if (hasRated) lockRating();

let selectedRating = 0;

const stars = document.querySelectorAll('#ratingStars span');

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.value);

    // إعادة تعيين كل النجوم
    stars.forEach(s => s.classList.remove('active'));

    // تفعيل النجوم من 1 إلى المختار
    stars.forEach(s => {
      if (parseInt(s.dataset.value) <= selectedRating) {
        s.classList.add('active');
      }
    });
  });
});
