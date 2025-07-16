function loadContentGenerator() {
    const html = `
        <h2>Random Blockquote Generator</h2>

        <div style="display: flex; gap: 20px;">
            <div style="flex: 1;">
                <label>Nhập văn bản trước thẻ <a> (mỗi dòng một dữ liệu):</label>
                <textarea id="beforeLink" rows="6" placeholder="Nhập văn bản trước thẻ <a>..." style="width: 100%;"></textarea>
            </div>
            <div style="flex: 1;">
                <label>Nhập văn bản sau thẻ </a> (mỗi dòng một dữ liệu):</label>
                <textarea id="afterLink" rows="6" placeholder="Nhập văn bản sau thẻ </a>..." style="width: 100%;"></textarea>
            </div>
        </div>

        <br>

        <div style="display: flex; gap: 20px;">
            <div style="flex: 1;">
                <label>Nhập URL cho liên kết (mỗi dòng một URL):</label>
                <textarea id="linkInput" rows="6" placeholder="Nhập URL, mỗi dòng một URL..." style="width: 100%;"></textarea>
            </div>
        </div>

        <br>

        <div>
            <label for="useBlockquote">Chọn có sử dụng <code>&lt;blockquote&gt;</code> không:</label>
            <input type="checkbox" id="useBlockquote" />
        </div>

        <br>

        <button class="tool-btn" onclick="generateContent()">Tạo Nội Dung</button>

        <h3>Kết quả:</h3>
        <textarea id="result" rows="6" style="width: 100%;" readonly></textarea>
    `;

    document.getElementById("content").innerHTML = html;
}

function generateContent() {
    const beforeLink = document.getElementById('beforeLink').value.trim().split('\n');
    const afterLink = document.getElementById('afterLink').value.trim().split('\n');
    const linkInput = document.getElementById('linkInput').value.trim().split('\n');
    const useBlockquote = document.getElementById('useBlockquote').checked;

    const results = [];

    // Random chọn dữ liệu từ trước và sau thẻ <a> và link
    for (let i = 0; i < 5; i++) { // Số lần tạo kết quả (ví dụ tạo 5 kết quả random)
        const randomBefore = beforeLink[Math.floor(Math.random() * beforeLink.length)].trim();
        const randomAfter = afterLink[Math.floor(Math.random() * afterLink.length)].trim();
        const randomLink = linkInput[Math.floor(Math.random() * linkInput.length)].trim();

        // Xây dựng nội dung cho mỗi lần random
        let content = `<p><strong>Xem thêm: </strong>${randomBefore} <a href="${randomLink}" target="_blank">thay màn hình Samsung S23 Ultra</a> ${randomAfter}</p>`;

        if (useBlockquote) {
            content = `<blockquote>\n${content}\n</blockquote>`;
        }

        results.push(content);
    }

    // Hiển thị tất cả các kết quả
    document.getElementById('result').value = results.join('\n\n');
}