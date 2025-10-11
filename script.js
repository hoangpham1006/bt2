// =========================
// A. VALIDATION FORM + XỬ LÝ NÚT GỬI
// =========================

// ✅ Lấy form theo id "form-lienhe"
const form = document.querySelector("#form-lienhe");
const nameInput = form.querySelector("#name");
const emailInput = form.querySelector("#email");
const messageInput = form.querySelector("#message");
const submitBtn = form.querySelector("input[type='submit']");

// Xóa thông báo lỗi cũ (nếu có)
function clearErrors() {
  form.querySelectorAll(".error").forEach((el) => el.remove());
}

// Hiển thị lỗi ngay dưới input
function showError(input, message) {
  const error = document.createElement("div");
  error.className = "error";
  error.style.color = "red";
  error.style.fontSize = "13px";
  error.style.marginTop = "5px";
  error.textContent = message;
  input.parentElement.appendChild(error);
}

// Hàm kiểm tra hợp lệ
function validateForm() {
  clearErrors();

  let isValid = true;

  // Kiểm tra tên
  if (nameInput.value.trim() === "") {
    showError(nameInput, "Vui lòng nhập họ và tên.");
    isValid = false;
  }

  // Kiểm tra email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    showError(emailInput, "Email không hợp lệ (phải có @ và tên miền).");
    isValid = false;
  }

  // Kiểm tra tin nhắn
  if (messageInput.value.trim().length < 10) {
    showError(messageInput, "Tin nhắn phải có ít nhất 10 ký tự.");
    isValid = false;
  }

  // Nếu hợp lệ → hiển thị kết quả
  if (isValid) {
    const feedback = document.createElement("div");
    feedback.id = "phanhoi";
    feedback.style.marginTop = "15px";
    feedback.innerHTML = `
      <h3 style="color:green;">Gửi thành công!</h3>
      <p><strong>Họ và tên:</strong> ${nameInput.value}</p>
      <p><strong>Email:</strong> ${emailInput.value}</p>
      <p><strong>Tin nhắn:</strong> ${messageInput.value}</p>
    `;
    form.appendChild(feedback);
    alert("Thông tin hợp lệ! Cảm ơn bạn đã liên hệ!");
    form.reset();
  }

  return isValid;
}

// Sự kiện khi bấm gửi
submitBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Ngăn form reload trang
  validateForm();
});

// =========================
// B. CHECKBOX "HOÀN THÀNH MỤC TIÊU"
// =========================
const checkboxes = document.querySelectorAll("#gioithieu table input[type='checkbox']");
checkboxes.forEach((cb) => {
  cb.addEventListener("change", function () {
    const row = this.closest("tr");
    if (this.checked) {
      row.style.backgroundColor = "#c6f5c6";
      row.style.textDecoration = "line-through";
    } else {
      row.style.backgroundColor = "";
      row.style.textDecoration = "none";
    }
  });
});

// =========================
// C. ẢNH ĐẠI DIỆN (tuỳ chọn)
// =========================
const avatar = document.getElementById("avatar");
if (avatar) {
  avatar.addEventListener("mouseover", () => {
    avatar.style.transform = "scale(1.05)";
    avatar.style.border = "3px solid #0b0848";
    avatar.style.transition = "all 0.3s ease";
  });
  avatar.addEventListener("mouseout", () => {
    avatar.style.transform = "scale(1)";
    avatar.style.border = "none";
  });
}

// =========================
// D. NÚT LÊN ĐẦU TRANG
// =========================
const topButton = document.createElement("button");
topButton.textContent = "⬆ Lên đầu trang";
topButton.id = "backToTop";
document.body.appendChild(topButton);

topButton.style.position = "fixed";
topButton.style.bottom = "20px";
topButton.style.right = "20px";
topButton.style.padding = "10px 15px";
topButton.style.fontSize = "14px";
topButton.style.backgroundColor = "#0b0848";
topButton.style.color = "white";
topButton.style.border = "none";
topButton.style.borderRadius = "8px";
topButton.style.cursor = "pointer";
topButton.style.display = "none";
topButton.style.transition = "opacity 0.3s";

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topButton.style.display = "block";
    topButton.style.opacity = "1";
  } else {
    topButton.style.opacity = "0";
    setTimeout(() => (topButton.style.display = "none"), 300);
  }
});

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
