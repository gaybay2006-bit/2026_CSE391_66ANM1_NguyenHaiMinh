// 1. Khởi tạo dữ liệu
let students = []; 
let sortDirection = 0; // 0: Mặc định, 1: Tăng dần, -1: Giảm dần

// Truy vấn DOM
const nameInput = document.getElementById('txtName');
const scoreInput = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const studentBody = document.getElementById('studentBody');
const statsArea = document.getElementById('statsArea');
const searchInput = document.getElementById('searchName');
const filterSelect = document.getElementById('filterRank');
const sortBtn = document.getElementById('sortBtn');

// 2. Các hàm bổ trợ (Logic)
function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

// 3. Hàm Xử lý chính: Lọc + Sắp xếp + Hiển thị
function applyFilters() {
    const keyword = searchInput.value.toLowerCase();
    const rankFilter = filterSelect.value;

    // Lọc dữ liệu
    let filtered = students.filter(sv => {
        const matchesName = sv.name.toLowerCase().includes(keyword);
        const matchesRank = (rankFilter === "All" || getRank(sv.score) === rankFilter);
        return matchesName && matchesRank;
    });

    // Sắp xếp dữ liệu
    if (sortDirection !== 0) {
        filtered.sort((a, b) => {
            return sortDirection === 1 ? a.score - b.score : b.score - a.score;
        });
    }

    renderTable(filtered);
}

// 4. Hàm vẽ bảng lên giao diện
function renderTable(data) {
    studentBody.innerHTML = "";
    
    if (data.length === 0) {
        studentBody.innerHTML = '<tr><td colspan="5">Không có kết quả</td></tr>';
        updateStats(0, 0);
        return;
    }

    let totalScore = 0;
    data.forEach((sv, index) => {
        const rank = getRank(sv.score);
        const rowClass = sv.score < 5 ? 'class="bg-yellow"' : '';
        totalScore += sv.score;

        studentBody.innerHTML += `
            <tr ${rowClass}>
                <td>${index + 1}</td>
                <td>${sv.name}</td>
                <td>${sv.score.toFixed(1)}</td>
                <td>${rank}</td>
                <td><button class="btn-delete" data-id="${sv.id}">Xóa</button></td>
            </tr>
        `;
    });

    const avg = (totalScore / data.length).toFixed(2);
    updateStats(data.length, avg);
}

function updateStats(count, avg) {
    statsArea.innerHTML = `Tổng số: ${count} | Điểm trung bình: ${avg}`;
}

// 5. Các hàm sự kiện
function addStudent() {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng kiểm tra lại thông tin!");
        return;
    }

    // Thêm vào mảng gốc với ID duy nhất
    students.push({
        id: Date.now(), // Dùng timestamp làm ID
        name: name,
        score: score
    });

    // Reset và focus
    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();

    applyFilters(); // Gọi lại hàm lọc để cập nhật bảng
}

// 6. Đăng ký sự kiện
btnAdd.addEventListener('click', addStudent);

scoreInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addStudent();
});

// Sự kiện Tìm kiếm & Lọc
searchInput.addEventListener('input', applyFilters);
filterSelect.addEventListener('change', applyFilters);

// Sự kiện Sắp xếp
sortBtn.addEventListener('click', function() {
    if (sortDirection === 0) sortDirection = 1;
    else if (sortDirection === 1) sortDirection = -1;
    else sortDirection = 0;

    const icons = ["↕", "▲", "▼"];
    this.querySelector('span').innerText = icons[sortDirection === 0 ? 0 : (sortDirection === 1 ? 1 : 2)];
    
    applyFilters();
});

// Event Delegation cho nút Xóa
studentBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const idToDelete = parseInt(e.target.getAttribute('data-id'));
        // Xóa trong mảng gốc dựa trên ID
        students = students.filter(sv => sv.id !== idToDelete);
        applyFilters();
    }
});