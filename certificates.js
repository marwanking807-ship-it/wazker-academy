const CERT_KEY = "certificates";
const ADMIN_KEY = "isAdmin";
const ADMIN_PASSWORD = "1234"; // غيّرها

/* ====== الإدارة ====== */
function openAdminModal() {
    document.getElementById("adminModal").style.display = "flex";
}

function closeAdminModal() {
    document.getElementById("adminModal").style.display = "none";
}

function loginAdmin() {
    const pass = document.getElementById("adminPassword").value;
    if (pass === ADMIN_PASSWORD) {
        localStorage.setItem(ADMIN_KEY, "true");
        closeAdminModal();
        updateAdminUI();
    } else {
        alert("كلمة المرور غير صحيحة");
    }
}

function logoutAdmin() {
    localStorage.removeItem(ADMIN_KEY);
    updateAdminUI();
}

/* ====== تحديث الواجهة ====== */
function updateAdminUI() {
    const isAdmin = localStorage.getItem(ADMIN_KEY);

    document.getElementById("addCertificateBox")
        .classList.toggle("hidden", !isAdmin);

    document.getElementById("adminBtn").textContent =
        isAdmin ? "خروج الإدارة" : "دخول الإدارة";

    document.getElementById("adminBtn").onclick =
        isAdmin ? logoutAdmin : openAdminModal;

        document.getElementById("adminBtn").className = isAdmin ? "admin-logout" : "";


    renderCertificates();
}

/* ====== إضافة شهادة ====== */
function addCertificate() {
    const name = document.getElementById("studentName").value;
    const file = document.getElementById("certificateImage").files[0];
    if (!name || !file) return;

    const reader = new FileReader();
    reader.onload = function (e) {

        const card = document.createElement("div");
        card.className = "certificate-card";
        card.innerHTML = `
            <img src="${e.target.result}">
            <div class="student-name">${name}</div>
        `;

        document.getElementById("certificatesBox").appendChild(card);
    };

    reader.readAsDataURL(file);
}



/* ====== حذف شهادة ====== */
function deleteCertificate(id) {
    if (!confirm("هل تريد حذف الشهادة؟")) return;

    let certs = JSON.parse(localStorage.getItem(CERT_KEY)) || [];
    certs = certs.filter(c => c.id !== id);
    localStorage.setItem(CERT_KEY, JSON.stringify(certs));
    renderCertificates();
}

/* ====== عرض الشهادات ====== */
function renderCertificates() {
    const box = document.getElementById("certificatesBox");
    box.innerHTML = "";

    const certs = JSON.parse(localStorage.getItem(CERT_KEY)) || [];
    const isAdmin = localStorage.getItem(ADMIN_KEY);

    certs.forEach(c => {
        const div = document.createElement("div");
        div.className = "certificate-card";
        div.innerHTML = `
            ${isAdmin ? `<button class="delete-cert" onclick="deleteCertificate(${c.id})">حذف</button>` : ""}
            <img src="${c.img}" onclick="openImage('${c.img}')">
            <p class="student-name">${c.name}</p>
        `;
        box.appendChild(div);
    });
}



/* ====== تكبير الصورة ====== */
function openImage(src) {
    const m = document.createElement("div");
    m.style.cssText = `
        position:fixed;inset:0;
        background:rgba(0,0,0,0.85);
        display:flex;align-items:center;justify-content:center;
        z-index:9999;
    `;
    m.innerHTML = `<img src="${src}" style="max-width:90%;max-height:90%;border-radius:12px;">`;
    m.onclick = () => m.remove();
    document.body.appendChild(m);
}

/* تشغيل */
updateAdminUI();
