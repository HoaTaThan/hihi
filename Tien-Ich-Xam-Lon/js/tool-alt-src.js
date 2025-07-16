function loadToolAltSrc() {
  const html = `
    <h2>Tool Chuyển ALT + SRC</h2>
    <div style="display: flex; gap: 20px;">
      <div style="flex: 1;">
        <label>ALT</label>
        <textarea id="altInput" rows="15" placeholder="hình nền hoa" style="width: 100%;"></textarea>
      </div>
      <div style="flex: 1;">
        <label>File name</label>
        <textarea id="srcInput" rows="15" placeholder="hinh-nen-hoa" style="width: 100%;"></textarea>
      </div>
    </div>
    <br>
    <label>Thư mục con 1 (tuỳ chọn):</label>
    <input id="subfolderInput1" placeholder="ví dụ: hinh-nen-hoa" style="width: 40%;" />
    <label>Thư mục con 2 (tuỳ chọn):</label>
    <input id="subfolderInput2" placeholder="ví dụ: mau-sac" style="width: 40%;" />
    <br><br>
    <label>Kích thước ảnh:</label>
    <select id="sizeSelect">
      <option value="457x800">457 x 800</option>
      <option value="1422x800">1422 x 800</option>
    </select>
    <br><br>
    <label>Định dạng ảnh:</label>
    <label><input type="radio" name="extType" value=".jpg" checked /> .jpg</label>
    <label><input type="radio" name="extType" value=".png" /> .png</label>
    <br><br>
    <button class="tool-btn" onclick="generateAltSrc()">Chuyển đổi</button>
    <button class="tool-btn" onclick="copyOutputAltSrc()">Copy kết quả</button>
    <h3>Kết quả</h3>
    <textarea id="output" rows="10" style="width: 100%;" readonly></textarea>
  `;

  document.getElementById("content").innerHTML = html;
}

function generateAltSrc() {
  const altLines = document.getElementById('altInput').value.trim().split('\n');
  const srcLines = document.getElementById('srcInput').value.trim().split('\n');
  const subfolder1 = document.getElementById('subfolderInput1').value.trim();
  const subfolder2 = document.getElementById('subfolderInput2').value.trim();
  const size = document.getElementById('sizeSelect').value.split('x');
  const height = size[0];
  const width = size[1];
  const extType = document.querySelector('input[name="extType"]:checked').value;

  let result = '';
  const filenameCounts = {};

  for (let i = 0; i < srcLines.length; i++) {
    const alt = altLines[i] ? altLines[i].trim() : '';
    let baseName = srcLines[i] ? srcLines[i].trim() : '';
    let filename = baseName + extType;

    if (filenameCounts[filename]) {
      const count = ++filenameCounts[filename];
      filename = `${baseName}_(${count})${extType}`;
    } else {
      filenameCounts[filename] = 1;
    }

    let src = "/upload_images/images/";
    if (subfolder1) src += subfolder1 + "/";
    if (subfolder2) src += subfolder2 + "/";
    src += filename;

    if (filename) {
      result += `<p style="text-align:center"><img alt="${alt}" src="${src}" style="height:${height}px; width:${width}px" /></p>\n`;
    }
  }

  document.getElementById('output').value = result;
}

function copyOutputAltSrc() {
  const output = document.getElementById('output');
  output.select();
  document.execCommand('copy');
  alert('Đã copy kết quả vào clipboard!');
}