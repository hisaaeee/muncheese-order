// MUNCHEESE 発注ページ用：Googleドライブにデータを保存する小さなプログラム
// ドライブ内に muncheese-order-data.json というファイルを作って読み書きします
const FILE = 'muncheese-order-data.json';

function file_() {
  const it = DriveApp.getFilesByName(FILE);
  if (it.hasNext()) return it.next();
  return DriveApp.createFile(FILE, '{"ts":0}', 'application/json');
}
function doGet() {
  return ContentService.createTextOutput(file_().getBlob().getDataAsString())
    .setMimeType(ContentService.MimeType.JSON);
}
function doPost(e) {
  const body = e.postData.contents;
  JSON.parse(body); // 壊れたデータは保存しない
  file_().setContent(body);
  return ContentService.createTextOutput('{"ok":true}').setMimeType(ContentService.MimeType.JSON);
}
