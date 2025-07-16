function loadToolImageWrap() {
  const html = `
    <h2>Tool Bao Ảnh Gắn ALT + Link</h2>

    <div style="display: flex; gap: 20px;">
      <div style="flex: 1;">
        <label>URL hình ảnh (mỗi dòng 1 ảnh):</label>
        <textarea id="imageUrlWrap" rows="6" placeholder="https://..." style="width: 100%;"></textarea>
      </div>
      <div style="flex: 1;">
        <label>List ALT (mỗi dòng 1 từ khoá):</label>
        <textarea id="altListWrap" rows="6" placeholder="mỗi dòng 1 từ khoá" style="width: 100%;"></textarea>
      </div>
    </div>
    <br>

    <div style="display: flex; gap: 20px;">
      <div style="flex: 1;">
        <label>URL bài viết (mỗi dòng 1 link):</label>
        <textarea id="hrefUrlWrap" rows="6" placeholder="https://..." style="width: 100%;"></textarea>
      </div>
      <div style="flex: 1;">
        <label>Text tiêu đề (mỗi dòng 1 tiêu đề):</label>
        <textarea id="headingTextWrap" rows="6" placeholder="CÓ THỂ BẠN QUAN TÂM" style="width: 100%;"></textarea>
      </div>
    </div>
    <br>

    <button class="tool-btn" onclick="generateImageWrap()">Tạo HTML</button>
    <button class="tool-btn" onclick="copyOutputImageWrap()">Copy kết quả</button>

    <h3>Kết quả</h3>
    <textarea id="outputWrap" rows="10" style="width: 100%;" readonly></textarea>
  `;

  document.getElementById("content").innerHTML = html;
}

function generateImageWrap() {
  const imageUrls = document.getElementById('imageUrlWrap').value.trim().split('\n');
  const altLines = document.getElementById('altListWrap').value.trim().split('\n');
  const hrefUrls = document.getElementById('hrefUrlWrap').value.trim().split('\n');
  const headingTexts = document.getElementById('headingTextWrap').value.trim().split('\n');

  let result = '';

  const max = Math.max(imageUrls.length, altLines.length, hrefUrls.length, headingTexts.length);
  for (let i = 0; i < max; i++) {
    const imageUrl = imageUrls[i] ? imageUrls[i].trim() : '';
    const alt = altLines[i] ? altLines[i].trim() : '';
    const href = hrefUrls[i] ? hrefUrls[i].trim() : '#';
    const heading = headingTexts[i] ? headingTexts[i].trim() : 'CÓ THỂ BẠN QUAN TÂM';
    if (!imageUrl || !alt) continue;
    result += `<p style="margin-top: 20px;">${heading}</p>\n`;
    result += `<a href="${href}" target="_blank">\n`;
    result += `  <img alt="${alt}" src="${imageUrl}" style="width: 510px; height: 350px;" />\n`;
    result += `</a>\n\n`;
  }

  document.getElementById('outputWrap').value = result;
}

function copyOutputImageWrap() {
  const output = document.getElementById('outputWrap');
  output.select();
  document.execCommand('copy');
  alert('Đã copy kết quả vào clipboard!');
}