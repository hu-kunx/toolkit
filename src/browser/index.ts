/**
 * @function 将base64链接转换为文件
 * @param dataUrl {string} Data URLs 字符串
 * @param filename {string} 文件名
 * @example dataURLtoFile("data:text/plain;base64,SGVsbG8sIF", "test")
 * @return {File}
 */
export function dataURLtoFile(dataUrl: string, filename: string): File {
  if (dataUrl === '' || dataUrl.indexOf(',') === -1) {
    throw new TypeError('need is a data url!');
  }
  if (filename === '') {
    throw new TypeError('a valid file name is required!');
  }
  const [info, content] = dataUrl.split(',');
  const mime = info.match(/:(.*?);/)![1];
  const utf8 = atob(content);
  let n = utf8.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = utf8.charCodeAt(n);
  }
  const fileName = filename + '.' + mime.split('/')[1];
  return new File([u8arr], fileName, {type: mime});
}

/**
 * @function 将base64链接转换为 Blob 对象
 * @param base64Data {string} Data URLs 字符串
 * @example dataURItoBlob("data:text/plain;base64,SGVsbG8sIF")
 * @return {Blob}
 */
export function dataURItoBlob(base64Data: string): Blob {
  let byteString;
  if (base64Data.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(base64Data.split(',')[1]);
  } else {
    byteString = unescape(base64Data.split(',')[1]);
  }
  const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {
    type: mimeString,
  });
}

/**
 * 下载二进制格式的文件
 * @param data blob
 * @param fileName string
 * @return void
 * @date 2021/9/22
 */
export function downloadFileByBlobData(data: Blob, fileName: string): void {
  const blob = new Blob([data]);
  const objectUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = objectUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(objectUrl);
}
