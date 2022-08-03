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
  downloadFile(objectUrl, fileName);
  window.URL.revokeObjectURL(objectUrl);
}
// 下载文件
export function downloadFile(url: string, fileName: string) {
  // 方案一 chrome 有问题
  // window.open(downloadUrl, '_blank');
  // 方案二 chrome有限制 https 不能下载http
  // https://www.ghacks.net/2020/10/08/chrome-is-blocking-downloads-here-is-why/
  // const a = document.createElement('a');
  // a.href = downloadUrl;
  // a.download = fileName;
  // document.body.appendChild(a);
  // a.click();
  // a.remove();
  // 方案三 要求同源
  // const xhr = new XMLHttpRequest()
  // xhr.responseType = 'blob'
  // xhr.open("GET", downloadUrl)
  // xhr.send(null)
  // xhr.onload = function(ev) {
  //   console.log(ev)
  // }
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
