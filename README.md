# 个人使用的函数, 方法集合

## 目录结构
```text
├── src
│   ├── browser
│   │   ├── index.ts
│   │   └── is.ts
│   ├── browser.ts
│   ├── index.ts
│   ├── node
│   │   ├── index.ts
│   │   ├── ip.ts
│   │   └── jwt.ts
│   ├── shared
│   │   ├── index.ts
│   │   ├── is.ts
│   │   ├── regexp.ts
│   │   ├── security
│   │   └── tools.ts
│   ├── trace
│   │   └── index.mjs
│   └── types
│       └── index.d.ts
```


## 浏览器和Node通用
* security 一些加密方法简单包装（依赖的是 `@peculiar/webcrypto`）
  * 浏览器底层是 `Web Crypto API` 需要考虑其兼容性。
