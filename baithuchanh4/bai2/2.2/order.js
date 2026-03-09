const prices = { "laptop": 15000000, "phone": 25000000, "mouse": 500000 };
const form = document.getElementById('orderForm');

// 1. TÍNH TỔNG TIỀN TỰ ĐỘNG
const calculateTotal = () => {
    const prod = document.getElementById('product').value;
    const qty = document.getElementById('quantity').value;
    const totalBox = document.getElementById('displayTotal');
    
    if (prod && qty > 0) {
        const total = prices[prod] * qty;
        totalBox.innerText = `Tổng tiền: ${total.toLocaleString('vi-VN')} VNĐ`;
    } else {
        totalBox.innerText = `Tổng tiền: 0 VNĐ`;
    }
};

document.getElementById('product').addEventListener('change', calculateTotal);
document.getElementById('quantity').addEventListener('input', calculateTotal);

// 2. ĐẾM KÝ TỰ GHI CHÚ
document.getElementById('note').addEventListener('input', function() {
    const len = this.value.length;
    const counter = document.getElementById('charCount');
    counter.innerText = `${len}/200`;
    counter.style.color = len > 200 ? "red" : "black";
});

// 3. CÁC HÀM VALIDATE
const showError = (id, msg) => document.getElementById(`${id}Error`).innerText = msg;
const clearError = (id) => document.getElementById(`${id}Error`).innerText = '';

const validateDate = () => {
    const dateVal = document.getElementById('deliveryDate').value;
    if (!dateVal) return (showError('deliveryDate', 'Vui lòng chọn ngày'), 0);
    
    const chosen = new Date(dateVal);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const limit = new Date();
    limit.setDate(today.getDate() + 30);

    if (chosen < today) return (showError('deliveryDate', 'Không chọn ngày quá khứ'), 0);
    if (chosen > limit) return (showError('deliveryDate', 'Không quá 30 ngày từ hôm nay'), 0);
    
    clearError('deliveryDate'); return 1;
};

const validateAddress = () => {
    const val = document.getElementById('address').value.trim();
    if (val.length < 10) return (showError('address', 'Địa chỉ ít nhất 10 ký tự'), 0);
    clearError('address'); return 1;
};

// 4. XỬ LÝ SUBMIT VÀ XÁC NHẬN
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Kiểm tra nhanh các trường khác
    const pValid = document.getElementById('product').value !== "" ? (clearError('product'), 1) : (showError('product', 'Chọn SP'), 0);
    const qValid = document.getElementById('quantity').value >= 1 ? (clearError('quantity'), 1) : (showError('quantity', 'Tối thiểu 1'), 0);
    const payValid = document.querySelector('input[name="payment"]:checked') ? (clearError('payment'), 1) : (showError('payment', 'Chọn PTTT'), 0);
    
    const isValid = pValid & qValid & validateDate() & validateAddress() & payValid;

    if (isValid === 1) {
        const prodName = document.getElementById('product').options[document.getElementById('product').selectedIndex].text;
        const total = document.getElementById('displayTotal').innerText;
        
        document.getElementById('summaryContent').innerHTML = `
            <p><b>Sản phẩm:</b> ${prodName}</p>
            <p><b>Số lượng:</b> ${document.getElementById('quantity').value}</p>
            <p><b>${total}</b></p>
            <p><b>Ngày giao:</b> ${document.getElementById('deliveryDate').value}</p>
        `;
        document.getElementById('confirmModal').style.display = 'block';
    }
});

// Nút Hủy và Xác nhận cuối cùng
document.getElementById('btnCancel').onclick = () => document.getElementById('confirmModal').style.display = 'none';
document.getElementById('btnConfirmFinal').onclick = () => {
    alert("Đặt hàng thành công! 🎉");
    location.reload();
};