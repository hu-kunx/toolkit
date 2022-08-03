export const Regexp = {
  phone: /^1[0-9]{10}$/,
  userName: /^[a-zA-Z\u4E00-\u9FA5][a-zA-Z0-9\u4E00-\u9FA5_]{4,15}$/,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  matchUrlQueryParams: /([^?=&]+)(=([^&]*))/g,
};
