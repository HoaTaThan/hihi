function loadToolDuplicateChecker() {
  const html = `
    <h2>🧩 Duplicate Checker Tool</h2>
    <div style="max-width: 700px; margin-bottom: 20px;">
      <label>Nhập danh sách cột 1 (mỗi dòng 1 mục):</label>
      <textarea id="dupInput1" rows="10" style="width: 100%;" placeholder="Dòng 1 cột 1\nDòng 2 cột 1\n..."></textarea>
    </div>
    
    <div style="max-width: 700px; margin-bottom: 20px;">
      <label>Nhập danh sách cột 2 (mỗi dòng 1 mục):</label>
      <textarea id="dupInput2" rows="10" style="width: 100%;" placeholder="Dòng 1 cột 2\nDòng 2 cột 2\n..."></textarea>
    </div>

    <button class="tool-btn" onclick="checkDuplicates()">Kiểm tra</button>

    <h3>✅ Không trùng</h3>
    <textarea id="uniqueOutput" rows="6" style="width: 100%;" readonly></textarea>

    <h3>⚠️ Trùng lặp</h3>
    <textarea id="duplicateOutput" rows="6" style="width: 100%;" readonly></textarea>
    <div id="noResultMessage" style="color: red; margin-top: 10px;"></div>
  `;

  document.getElementById("content").innerHTML = html;
}

function checkDuplicates() {
  const inputLines1 = document.getElementById("dupInput1").value.trim().split('\n');
  const inputLines2 = document.getElementById("dupInput2").value.trim().split('\n');
  
  const seen = new Set();
  const duplicates = new Set();
  const uniqueInFirstColumn = [];
  const uniqueInSecondColumn = [];

  // Kiểm tra trùng lặp giữa cột 1 và cột 2
  for (const raw of inputLines1) {
    const original1 = raw.trim();
    if (!original1) continue;

    if (inputLines2.includes(original1)) {
      duplicates.add(original1); // Thêm vào trùng lặp nếu có mặt trong cột 2
    } else {
      uniqueInFirstColumn.push(original1); // Dòng không trùng với cột 2
    }
  }

  // Kiểm tra các giá trị còn lại trong cột 2 không có trong cột 1
  for (const raw of inputLines2) {
    const original2 = raw.trim();
    if (!original2) continue;

    if (!seen.has(original2) && !duplicates.has(original2)) {
      uniqueInSecondColumn.push(original2); // Dòng không trùng với cột 1
      seen.add(original2); // Đánh dấu đã kiểm tra cột 2
    }
  }

  // Cập nhật kết quả không trùng
  document.getElementById("uniqueOutput").value = [...uniqueInFirstColumn, ...uniqueInSecondColumn].join('\n');
  
  // Cập nhật kết quả trùng lặp
  document.getElementById("duplicateOutput").value = Array.from(duplicates).join('\n');
  
  // Hiển thị thông báo nếu không có kết quả trùng lặp
  const noResultMessage = document.getElementById("noResultMessage");
  if (duplicates.size === 0) {
    noResultMessage.innerText = "Không có dòng trùng lặp nào!";
  } else {
    noResultMessage.innerText = "";
  }
}