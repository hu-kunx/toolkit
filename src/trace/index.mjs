// console.log(process.stdout.columns, process.stdout.rows);

// import readline from 'readline'

// console.log("tets---1")
// console.log("test---2")
// console.log("test---3");


// readline.clearLine(process.stdout, 0);
// readline.cursorTo(process.stdout, 1)
// // readline.moveCursor(process.stdout, 2, -1)
// console.log("test---4")

// // readline.cursorTo(process.stdout, 2, 25)

// const originalPrepareStackTrace = Error.prepareStackTrace;
// Error.prepareStackTrace = (_, stack) => stack;
// const callee = new Error().stack[1];
// Error.prepareStackTrace = originalPrepareStackTrace;
// console.log(callee.getFileName(), callee.getLineNumber());
// // https://v8.dev/docs/stack-trace-api#customizing-stack-traces



const add = new Function("a", "b", `
  return a + b
`)

console.log(add(1, 2))