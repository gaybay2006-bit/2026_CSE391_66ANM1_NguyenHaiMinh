// === HOẠT ĐỘNG 1: GIỚI THIỆU JS & CÚ PHÁP CƠ BẢN ===
console.log("Hello from JavaScript!");

// Thử nghiệm biến và kiểu dữ liệu
let name = "Hải Minh Nguyễn"; // string
let age = 21;                 // number
let isStudent = true;         // boolean

console.log("Tên:", name, "| Kiểu:", typeof name);
console.log("Tuổi:", age, "| Kiểu:", typeof age);
console.log("Sinh viên:", isStudent, "| Kiểu:", typeof isStudent);

// Đoạn script tính tuổi và hiển thị log
console.log("Xin chào, mình là " + name + ", năm nay mình " + age + " tuổi.");


// === HOẠT ĐỘNG 2: CẤU TRÚC ĐIỀU KHIỂN & HÀM ===

// Hàm tính điểm trung bình
function tinhDiemTrungBinh(m1, m2, m3) {
    let avg = (m1 + m2 + m3) / 3;
    return avg;
}

// Thử nghiệm hàm và cấu trúc if/else
let score = 9; 
console.log("Điểm trung bình thực tế: " + score);

if (score >= 8) {
    console.log("Xếp loại: Giỏi");
} else if (score >= 5) {
    console.log("Xếp loại: Trung bình");
} else {
    console.log("Xếp loại: Yếu");
}


// === HOẠT ĐỘNG 3: THAO TÁC DOM & SỰ KIỆN ===

// 1. Thay đổi nội dung khi nhấn nút Run
const runBtn = document.getElementById("runBtn");
const welcomeTxt = document.getElementById("welcome");

runBtn.addEventListener("click", function() {
    welcomeTxt.innerText = "JavaScript đã được kích hoạt thành công!";
    console.log("Nút 'Chạy JS' đã được nhấn.");
});

// 2. Thay đổi trạng thái (status)
const btnHello = document.getElementById("btnHello");
const statusTxt = document.getElementById("status");

btnHello.onclick = function() {
    statusTxt.innerText = "Nội dung đã được thay đổi bởi JS!";
    statusTxt.style.color = "green";
};

// 3. Đổi màu nền (backgroundColor)
const changeBgBtn = document.getElementById("changeBgBtn");
changeBgBtn.onclick = function() {
    // Đổi sang màu red như trong bài phản tư
    document.body.style.backgroundColor = "red"
};

// 4. Xử lý sự kiện Input
const nameInput = document.getElementById("nameInput");
const greetingTxt = document.getElementById("greeting");

nameInput.addEventListener("input", function() {
    let currentVal = nameInput.value;
    greetingTxt.innerText = "Xin chào, " + currentVal + "!";
});