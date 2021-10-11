const ua = window.navigator.userAgent.toLowerCase();

// 是否是微信浏览器
export function isWeiXin(): boolean {
  return /microMessenger/i.test(ua);
}

// 是否是移动端
export function isDeviceMobile(): boolean {
  return /android|webos|iphone|ipod|balckberry/i.test(ua);
}

// IOS
export function isIos(): boolean {
  let u = navigator.userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    //安卓手机
    return false;
  } else if (u.indexOf('iPhone') > -1) {
    //苹果手机
    return true;
  } else if (u.indexOf('iPad') > -1) {
    //iPad
    return false;
  } else if (u.indexOf('Windows Phone') > -1) {
    // win phone 手机
    return false;
  } else {
    return false;
  }
}

// 是否是 pc 端
export function isPC(): boolean {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  return Agents.some(val => userAgentInfo.includes(val));
}
