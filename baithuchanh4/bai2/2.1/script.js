// Lấy các phần tử DOM
const form = document.getElementById('regForm');
const formWrapper = document.getElementById('form-wrapper');
const successBox = document.getElementById('success-box');

// Hàm hiển thị lỗi
const showError = (fieldId, message) => {
    document.getElementById(`${fieldId}Error`).innerText = message;
};

// Hàm xóa lỗi
const clearError = (fieldId) => {
    document.getElementById(`${fieldId}Error`).innerText = '';
};

// --- CÁC HÀM VALIDATE RIÊNG BIỆT ---

const validateFullname = () => {
    const val = document.getElementById('fullname').value.trim();
    const regex = /^[a-zA-ZÀ-ỹ\s]{3,}$/;
    if (!val) { showError('fullname', 'Họ tên không được để trống'); return 0; }
    if (!regex.test(val)) { showError('fullname', 'Tên ít nhất 3 ký tự và chỉ chứa chữ cái'); return 0; }
    clearError('fullname'); return 1;
};

const validateEmail = () => {
    const val = document.getElementById('email').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) { showError('email', 'Email không được trống'); return 0; }
    if (!regex.test(val)) { showError('email', 'Định dạng email không đúng (name@domain.com)'); return 0; }
    clearError('email'); return 1;
};

const validatePhone = () => {
    const val = document.getElementById('phone').value.trim();
    const regex = /^0\d{9}$/;
    if (!val) { showError('phone', 'Số điện thoại không được trống'); return 0; }
    if (!regex.test(val)) { showError('phone', 'SĐT phải có 10 số và bắt đầu bằng số 0'); return 0; }
    clearError('phone'); return 1;
};

const validatePassword = () => {
    const val = document.getElementById('password').value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!val) { showError('password', 'Mật khẩu không được trống'); return 0; }
    if (!regex.test(val)) { showError('password', 'Cần ít nhất 8 ký tự, gồm chữ HOA, thường và số'); return 0; }
    clearError('password'); return 1;
};

const validateConfirm = () => {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (!confirm) { showError('confirmPassword', 'Vui lòng xác nhận mật khẩu'); return 0; }
    if (confirm !== pass) { showError('confirmPassword', 'Mật khẩu xác nhận không khớp'); return 0; }
    clearError('confirmPassword'); return 1;
};

const validateGender = () => {
    const genderChecked = document.querySelector('input[name="gender"]:checked');
    if (!genderChecked) { showError('gender', 'Vui lòng chọn giới tính'); return 0; }
    clearError('gender'); return 1;
};

const validateTerms = () => {
    const isChecked = document.getElementById('terms').checked;
    if (!isChecked) { showError('terms', 'Bạn phải chấp nhận điều khoản'); return 0; }
    clearError('terms'); return 1;
};

// --- GẮN SỰ KIỆN (EVENT LISTENERS) ---

// Validate khi Blur và xóa lỗi khi Input
const addLiveValidation = (id, validateFunc) => {
    const element = document.getElementById(id);
    element.addEventListener('blur', validateFunc);
    element.addEventListener('input', () => clearError(id));
};

addLiveValidation('fullname', validateFullname);
addLiveValidation('email', validateEmail);
addLiveValidation('phone', validatePhone);
addLiveValidation('password', validatePassword);
addLiveValidation('confirmPassword', validateConfirm);

// Riêng Radio và Checkbox dùng sự kiện change
document.getElementsByName('gender').forEach(radio => {
    radio.addEventListener('change', validateGender);
});
document.getElementById('terms').addEventListener('change', validateTerms);

// Xử lý Submit Form
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Sử dụng toán tử bitwise & để ép thực thi tất cả hàm (hiển thị toàn bộ lỗi)
    const isAllValid = 
        validateFullname() & 
        validateEmail() & 
        validatePhone() & 
        validatePassword() & 
        validateConfirm() & 
        validateGender() & 
        validateTerms();

    if (isAllValid === 1) {
        const userName = document.getElementById('fullname').value;
        formWrapper.style.display = 'none';
        successBox.style.display = 'block';
        document.getElementById('welcomeMsg').innerHTML = `Đăng ký thành công! 🎉<br>Chào mừng ${userName}`;
    }
});