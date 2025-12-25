function register() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let phone = document.getElementById("phone").value;
    let saved = document.getElementById("saved").value;
    let country = document.getElementById("country").value;
    const lessons = document.getElementById("lessons").value;


    if (!name || !age || !phone || !saved || !country) {
        alert("من فضلك أكمل جميع البيانات");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push({ name, age, phone, saved, country });
    localStorage.setItem("students", JSON.stringify(students));

    let msg =
        `تسجيل طالب جديد:%0A` +
        `الاسم: ${name}%0A` +
        `العمر: ${age}%0A` +
        `رقم التواصل: ${phone}%0A` +
        `حفظ سابق: ${saved}%0A` +
        `البلد: ${country}%0A` +
        `عدد المحاضرات شهريًا: ${lessons}`;

    window.open(
        `https://wa.me/201028199381?text=${msg}`,
        "_blank"
    );

    document.getElementById("result").innerHTML = `
        <div class="comment">
            ✔ تم التسجيل بنجاح<br>
            سيتم التواصل معك قريبًا 
        </div>
    `;
}
