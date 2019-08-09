# Node.js Under The Hood

> The complete guide for understanding node.js to the bare bone

## Summary

- [Node.js Under The Hood](#nodejs-under-the-hood)
  - [Summary](#summary)
  - [Goal](#goal)
  - [What is Node.js](#what-is-nodejs)
    - [Brief History of Node.js](#brief-history-of-nodejs)
    - [Brief History of JavaScript itself](#brief-history-of-javascript-itself)
    - [Elements that compose Node.js](#elements-that-compose-nodejs)
  - [Our example - I/O function call](#our-example---io-function-call)
  - [JavaScript under the hood](#javascript-under-the-hood)
    - [JavaScript engine](#javascript-engine)
    - [JavaScript Runtime](#javascript-runtime)
    - [Call stack](#call-stack)
      - [About stacks](#about-stacks)
      - [Stacks and JavaScript](#stacks-and-javascript)
      - [Stack Overflow](#stack-overflow)
      - [Single-threading pros and cons](#single-threading-pros-and-cons)
    - [Concurrency and Event Loop](#concurrency-and-event-loop)
  - [References](#references)

## Goal

The goal of this document is to make possible the understanding of how Node.js works internally, this was mainly due to the fact that Node.js and JavaScript are worldwide celebrities due to their **libraries**, but no one actually knows how do they even work under the hood. In order to do this, we'll try to cover several topics:

1. What is Node.js
   1. Brief history
   2. Brief history of JavaScript itself
   3. Elements that are part of Node.js
2. Following through a I/O file read function call
3. JavaScript
   1. How does it work under the hood?
      1. Callstack
      2. Heap
      3. Tail Call Optimization
4. Libuv
   1. What is libuv?
   2. Why do we need it?
   3. EventLoop
5. Native Modules
   1. N-API
   2. FileSystem access through native C++
6. V8
   1. What is v8
   2. Overview
      1. Abstract Syntax Tree using Esprima
   3. Old compiling pipeline
      1. The full codegen
      2. Crankshaft
         1. Hydrogen
         2. Lithium
   4. The new compiling pipeline
      1. Ignition
      2. TurboFan
         1. Sea Of Nodes
         2. Hidden Classes and variable allocation
         3. Garbage collection
7. Compiler optimizations
   1. Constant Folding
   2. Induction Variable Analysis
   3. Rematerialization
   4. Removing Recursion
   5. Deforestation
   6. Peephole Optimizations
   7. Inline Expansion
   8. Inline Caching
   9. Dead Code Elimination
   10. Code Block Reordering
   11. Jump Threading
   12. Trampolines
   13. Commom subexpression elimination
   14. Loops
      1.  Loop Fission/distribution
      2.  Loop Fusion/ramming/jamming
      3.  Loop Inversion
      4.  Loop Interchange
      5.  Loop-Invariant Code Motion
      6.  Loop Nest Optimization
      7.  Loop Reversal
      8.  Loop Unrolling
      9.  Loop Splitting
      10. Loop Unswitching

## What is Node.js

Node.js is defined by Ryan Dahl (the original creator) as a "set of libraries that run on top of the V8 engine, allowing us to run JavaScript code on the server", Wikipedia defines it as "an open-source, cross-platform JavaScript runtime environment that executes code outside of a browser".

Essentially, Node.js is a runtime that allows us to execute JS outside the browser's domain. However, this is not the first implementation of server side Javascript. In 1995, Netscape implemented what was called Netscape Enterprise Server, which allowed users to run LiveScript (early JavaScript) in the server.

### Brief History of Node.js

Node.js was first released in 2009, written by Ryan dahl, which was later sponsored by Joyent. The whole origin of the runtime begins with the limited possibilities of the Apache HTTP Server - the most popular webserver back then - to handle a lot of concurrent connections. Also, Dahl criticized the way of writing code, which was sequential, this could led to entire process blockings or multiple execution stacks in case of multiple simmultaneous connections.

Node.js was first presented in the JSConf EU, on November 8th, 2009. It combined V8, an event loop provided by the - recently written - libuv and a low level I/O API.

### Brief History of JavaScript itself

Javascript is defined as a "high-level, interpreted scripting language" that conforms to the ECMAScript specification. JS was created in 1995 by Brendan Eich while he worked in a scripting language to Netscape browser. JavaScript was solely created to fulfill Marc Andreessen's idea of having a "glue language" between HTML and web designers, which should be easy to use to assemble components such as images and plugins, in such way that the code would be directly written in the web page markup.

Brendan Eich was recruited to implement Scheme language into Netscape, but, due to a partnership between Sun Microsystems and Netscape in order to include Java in the Netscape navigator, his focus was switched into creating a language that was somehow Java-like with a similar syntax. In order to defend the idea of JavaScript against other proposals, Eich wrote, in 10 days, a working prototype.

The ECMA specification came an year later when Netscape submitted the JavaScript language to ECMA International in order to carve out a standard specification, which other browser vendors could then implement based on the work done at Netscape. This led to the first ECMA-262 standard in 1997. ECMAScript-3 was released on December 1999 and it is the modern-day baseline for JavaScript language. ECMAScript 4 was mothballed because Microsoft had no intention of cooperating or implementing proper JavaScript in IE, even though they had no competing proposals and had a partial, but divergent, implementation of the .NET language server side.

In 2005, the open source and developer communities set to work to revolutionize what could be done with JavaScript. First, in 2005, Jesse James Garret published the draft of what would be called AJAX, this resulted in the renaissance of JavaScript usage led by open source libraries like jQuery, Prototype and MooTools. In 2008, after this whole community started using JS again, the ECMAScript 5 was announced, and launched in 2009.

### Elements that compose Node.js

Node.js is composed of few dependencies:

- V8
- Libuv
- http-parser
- c-ares
- OpenSSL
- zlib

This image (in Samer Buna's course) has the perfect explanation:

![](./assets/nodejs-components.png)

With that said, we can split Node.js into two parts: V8 and Libuv. V8 is about 70% C++ and 30% JavaScript, while Libuv is completely written in C++.

## Our example - I/O function call

In order to achieve our goal (and to have a clear roadmap of what we're going to do), we'll start by writing a simple program which reads a file and prints it to the screen. You'll see that this code will not be the optimal code a programmer can write, but it'll fulfill the purpose of being an object of study for all the parts we are supposed to go through.

If you take a closer look at the [Node.js source](https://github.com/nodejs/node), you'll notice two main folders: `lib` and `src`. The `lib` folder is the one that contains all the **JavaScript** definitions of all functions and modules we require into our projects. The `src` folder is the **C++ implementations** that comes along with them, this is where Libuv and V8 resides, where all the implementations for modules like `fs`, `http`, `crypto` and others end up residing.

Let there be this simple program:

```js
const fs = require('fs')
const path = require('path')
const filePath = path.resolve(`../myDir/myFile.md`)

// Parses the buffer into a string
function callback (data) {
  return data.toString()
}

// Transforms the function into a promise
const readFileAsync = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) return reject(err)
      return resolve(callback(data))
    })
  })
}

(() => {
  readFileAsync(filePath)
    .then(console.log)
    .catch(console.error)
})()
```

All the examples we'll have in this article will be related to this program. And this is due to the fact that `fs.readFile` is **not** either part of V8 or JavaScript. This function is solely implemented by Node.js as a C++ binding to the local OS, however, the high-level API we use as `fs.readFile(path, cb)` is fully implemented in JavaScript, which calls those bindings. Here's the full source code of this specific `readFile` function (because the whole file is 1850 lines long, but it's in the references):

```js
// https://github.com/nodejs/node/blob/0e03c449e35e4951e9e9c962ff279ec271e62010/lib/fs.js#L46
const binding = internalBinding('fs');
// https://github.com/nodejs/node/blob/0e03c449e35e4951e9e9c962ff279ec271e62010/lib/fs.js#L58
const { FSReqCallback, statValues } = binding;

// https://github.com/nodejs/node/blob/0e03c449e35e4951e9e9c962ff279ec271e62010/lib/fs.js#L283
function readFile(path, options, callback) {
  callback = maybeCallback(callback || options);
  options = getOptions(options, { flag: 'r' });
  if (!ReadFileContext)
    ReadFileContext = require('internal/fs/read_file_context');
  const context = new ReadFileContext(callback, options.encoding);
  context.isUserFd = isFd(path); // File descriptor ownership

  const req = new FSReqCallback();
  req.context = context;
  req.oncomplete = readFileAfterOpen;

  if (context.isUserFd) {
    process.nextTick(function tick() {
      req.oncomplete(null, path);
    });
    return;
  }

  path = getValidatedPath(path);
  binding.open(pathModule.toNamespacedPath(path),
               stringToFlags(options.flag || 'r'),
               0o666,
               req);
}
```

> **Disclaimer:** I'm pasting the code references in the github source links as of the commit `0e03c449e35e4951e9e9c962ff279ec271e62010` which is the latest right now, this way this document will always point to the right implementation in the time I wrote it.

See line 5? We have a require call to `read_file_context`, another JS file (which is in the references as well). In the end of the `fs.readFile` [source code](https://github.com/nodejs/node/blob/0e03c449e35e4951e9e9c962ff279ec271e62010/lib/fs.js), we have a call to `binding.open`, which is a C++ call to open a file descriptor, passing the path, the C++ `fopen` flags, the file mode permissions in octal format (`0o` [is octal in ES6](https://2ality.com/2015/04/numbers-math-es6.html)) and, lastly, the `req` variable which is the async callback function which will receive our file context.

Along with all that, we have the `internalBinding`, which is the private internal C++ binding loader, this is not accesible to the end users (like us) because they're available through `NativeModule.require`, this is the thing that actually loads C++ code. And this is where we are [depend on V8, A LOT](https://github.com/nodejs/node/blob/0e03c449e35e4951e9e9c962ff279ec271e62010/src/node_file.cc#L54-L79).

So, basically, in the code above, we're requiring a `fs` binding with `internalBinding('fs')`, which calls and loads the [`src/node_file.cc`](https://github.com/nodejs/node/blob/0e03c449e35e4951e9e9c962ff279ec271e62010/src/node_file.cc) (because this whole file is in the [`namespace fs`](https://github.com/nodejs/node/blob/0e03c449e35e4951e9e9c962ff279ec271e62010/src/node_file.cc#L52)) file that contains all the C++ implementations for our `FSReqCallback` and `statValues` functions.

The function `FSReqCallback` is the async callback used when we call `fs.readFile` (when we use `fs.readFileSync` there's another function called `FSReqWrapSync` which is defined [here](https://github.com/nodejs/node/blob/0e03c449e35e4951e9e9c962ff279ec271e62010/src/node_file.cc#L681)) and all its methods and implementations are defined [here](https://github.com/nodejs/node/blob/0e03c449e35e4951e9e9c962ff279ec271e62010/src/node_file.cc#L449-L475) and exposed as bindings [here](https://github.com/nodejs/node/blob/0e03c449e35e4951e9e9c962ff279ec271e62010/src/node_file.cc#L2218-L2228):

```cpp
// https://github.com/nodejs/node/blob/0e03c449e35e4951e9e9c962ff279ec271e62010/src/node_file.cc

FileHandleReadWrap::FileHandleReadWrap(FileHandle* handle, Local<Object> obj)
  : ReqWrap(handle->env(), obj, AsyncWrap::PROVIDER_FSREQCALLBACK),
    file_handle_(handle) {}

void FSReqCallback::Reject(Local<Value> reject) {
  MakeCallback(env()->oncomplete_string(), 1, &reject);
}

void FSReqCallback::ResolveStat(const uv_stat_t* stat) {
  Resolve(FillGlobalStatsArray(env(), use_bigint(), stat));
}

void FSReqCallback::Resolve(Local<Value> value) {
  Local<Value> argv[2] {
    Null(env()->isolate()),
    value
  };
  MakeCallback(env()->oncomplete_string(),
               value->IsUndefined() ? 1 : arraysize(argv),
               argv);
}

void FSReqCallback::SetReturnValue(const FunctionCallbackInfo<Value>& args) {
  args.GetReturnValue().SetUndefined();
}

void NewFSReqCallback(const FunctionCallbackInfo<Value>& args) {
  CHECK(args.IsConstructCall());
  Environment* env = Environment::GetCurrent(args);
  new FSReqCallback(env, args.This(), args[0]->IsTrue());
}

// Create FunctionTemplate for FSReqCallback
Local<FunctionTemplate> fst = env->NewFunctionTemplate(NewFSReqCallback);
fst->InstanceTemplate()->SetInternalFieldCount(1);
fst->Inherit(AsyncWrap::GetConstructorTemplate(env));
Local<String> wrapString =
    FIXED_ONE_BYTE_STRING(isolate, "FSReqCallback");
fst->SetClassName(wrapString);
target
    ->Set(context, wrapString,
          fst->GetFunction(env->context()).ToLocalChecked())
    .Check();
```

In this last bit, there's a constructor definition: `Local<FunctionTemplate> fst = env->NewFunctionTemplate(NewFSReqCallback)`. This basically says that when we call `new FSReqCallback()` the `NewFSReqCallback` will be called. Now see how the `context` property appears in the `target->Set(context, wrapString, fst->GetFunction)` part, and also how `oncomplete` also is defined and used on the `::Reject` and `::Resolve`.

It is also valuable to note that the `req` variable is built upon the result of the `new ReadFileContext` call, which is referenced as `context` and set as `req.context`. This means that the `req` variable is also a C++ binding representation of a request callback built with the function `FSReqCallback()` and setting its context to our callback and listening to an `oncomplete` event.

## JavaScript under the hood

Let's put things in order. So, we got a glimpse of the appearance of the actual C++ code that runs underneath all the gibberish we write in Node.js, since JavaScript is the highest level component of Node.js, let's start by asking how our code runs, how do JavaScript even work?

Most of people actually knows a few said words and keep repeating them:

- JavaScript is single-threaded
- V8 powers the Chrome JavaScript engine
- JavaScript uses callback queues
- There's an event loop of some sort

But have dug deeper into these questions?

- What does it mean to be single-threaded?
- What in heavens is a JS engine? And what, in fact, is V8?
- How do these callback queues work? Is there only one queue?
- What is an event loop? How does it work? Who provides it? Is it part of JS?

If you're able to answer more than 3 of those, consider yourself above average, because most JavaScript developers in general don't even know there's something at all behind this language... But, fear not, we're here to help, so let's dig deeper into the concept of JavaScript and how it really works and, most important, why other people bully it

### JavaScript engine

Nowadays, the most popular JavaScript engine is V8 (one of the best pieces softwares ever written by mankind, after Git). This is due to the simple fact that the most used browser is Chrome, or is based on Chromium - which is the open source browsing engine of Chrome - like Opera, Brave and so on... However it is not the only one. We have Chakra, written by Microsoft for the Edge browser, and we have SpiderMonkey, written by Netscape which now powers Firefox and much others like Rhino, KJS, Nashorn and etc.

However, since V8 is used both on Chrome and Node.js, we're sticking with it. This is a very simplified view of what it looks like:

![Image from Session Stack, in references](assets/v8-simplified.png)

This engine consists, mainly, in two components:

- The **memory heap**: where all memory allocation happens
- The **call stack**: where our code gets framed and stacked to execute

> We'll have a solo chapter for V8 later on

### JavaScript Runtime

Most APIs developers use are provided by the engine itself, like we were able to see in the previous chapters when we wrote the `readFile` code. However, some APIs we use are not provided by the engine, like `setTimeout`, any sort of DOM manipulation, like `document` or even AJAX (the `XMLHttpRequest` object). Where are those comming from? Let's take our previous image and bring it into the harsh reality we live in:

![Image from Session Stack, link in the references](/assets/v8-real.png)

The engine is just a tiny bit of what makes JavaScript, well... JavaScript... There are browser-provided APIs which we call **Web APIs**, these APIs (like `DOM`, `AJAX` and `setTimeout`) are provided by the browser vendors - in this case, for Chrome, it's Google - and they are the main reason why most people hated, and still hate, JavaScript. When we look at today's JavaScript we see a field filled with packages and other stuff, but mostly homogeneous on every side. Well... It wasn't always like that.

Back in the day, before ES6 and way before Node.js even existed as an idea, there were no consensus on how to implement these APIs on the browser side, so every vendor had their own implementation of 'em, or not... Which meant that we had to be constantly checking and writing pieces of code that were meant to only work on specific browser (do you remember IE?), so a particular browser could implement the `XMLHttpRequest` a bit different from other browser, or the `setTimeout` function could be named `sleep` in some implementation; in the worst case scenario, the API would not even exist at all. This has been changing gradually, so now, thankfully, we have some consensus and some agreement on which APIs should exist and how they should be implemented, at least the most used and basic ones.

Aside of that, we have the infamous event loop and the callback queue. Which we'll be talking about later.

### Call stack

Most people have heard that JS is a single-threaded language, and they just accepted it as the final truth in the universe without ever really knowing why. Being single-threaded means we only have a single call stack, in other words, we can only execute one thing at a time.

#### About stacks

[Stacks](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) are a abstract data type that serves as a collection of elements. The name "stack" comes from the analogy to a set of boxes stacked on top of each other, while it is easy to take a box off the top of the stack, taking a deeper box may require us to take several other items first.

The stack has two principal methods:

- **push**: Adds another element to the collection
- **pop**: Removes the most recently added element that was not yet removed from the stack and **returns** its value

One thing to note about stacks is that the order of how the elements are pushed and popped really matters. In stacks, the order in which elements come off a stack is called **LIFO**, an acronym for **L***ast* **I***n* **F***irst* **O***ut*, which is pretty self explanatory.

> Additionally, we can have another method called `peek`, which reads the most recently added item (the top of the stack) without removing it.

All we need to know about stacks are these topics:

- They're a data structure on which each item in the stack holds a value, in our case, an instruction or call
- New items (calls) are added to the **top** of the stack
- Removed items come off the **top** of the stack as well

#### Stacks and JavaScript

Basically, in JS, the stack records the position we are currently executing in our program. If we step into a function, calling it, we put that call on the top of the stack. After we return from a function, we pop the top of the stack. Each of these calls is called a **Stack Frame**.

Let's take as first example, a simple program, different from the one we had:

```js
function multiply (x, y) {
    return x * y
}

function printSquare (x) {
    const s = multiply(x, x)
    console.log(s)
}

printSquare(5)
```

> We'll run our `readFile` code later on when we have glued all the pieces together

When the engine runs the code, at first, the call stack will be empty. After each step, it'll be filling up with the following:

![](assets/simple-callstack.png)

Let's go in bit by bit:

- The step 0 (not shown) is the empty stack, which means the very beginning of our program
- In the first step we add the first function call. The call to `printSquare(5)`, since all other lines are just declarations.
- In the second step we step into the `printSquare` function definition
  - See how we call `const s = multiply(x, x)`, so let's add the `multiply(x, x)` to the top of the stack
  - Later, we step into `multiply`, no function calls, nothing is added to the stack. We only evaluate `x * y` and return it.
  - Returning means the function has finished running, so we can pop it off the stack
- In step 3 we no longer have the stack frame referencing `multiply(x, x)`. So now let's go on to the line just after the last line we evaluated, it's the `console.log` line.
  - `console.log` is a function call, let's add to the top of the stack
  - After `console.log(s)` runs, we can pop it off the stack
- In step 4 we now only have a single stack frame: `printSquare(5)`, which was the first we added
  - Since this is the first function call, and there's no other code after it, this means the function is done. Pop it off the stack
- Step 5 is equal to step 0, an empty stack

So let's take a few keynotes here:

- The step 0 and the last step in a call stack of some program should be deeply equal - empty, since the first step means the program has just begun and the last means the program has just ended
- The first step and the step just before the last step should also be equal and have the first ever function called in the program
- The middle steps are just stacked upon the entrypoint function

Stacks are exactly how stack traces are constructed when an exception is thrown. A stack trace is basically the printed out state of the call stack when the exception happened:

```js
function foo () {
    throw new Error('Exception');
}

function bar () {
    foo()
}

function start () {
    bar()
}

start()
```

This should print something like:

```
Uncaught Error: Exception foo.js:2
    at foo (foo.js:2)
    at bat (foo.js:6)
    at start (foo.js:10)
    at foo.js:13
```

The `at` phrases are just our call stack state.

#### Stack Overflow

No, the stack is not named after the site, sorry to disappoint. Actually, the site is named after one of the most common errors found in programming since the beginning of computation: the stack overflow.

A stack overflow error happens when we reach the maxiumum call stack size. Stacks are data structures, which means they're allocated in memory, and memory is not infinite, so this can happen rather easily, specially on non-treated recursive functions, like this:

```js
function f () {
  return f()
}

f()
```

At every call of `f` we'll pile up `f` in the stack, but, as we saw, we can never remove an item from the stack before it has reached the end of its execution, in other words, whe the code reaches a point where no functions are called. So our stack would be blown because we have no termination condition:

![](assets/stack-overflow.png)

Thankfully, the engine is watching us and realizes the function would never stop calling itself, causing an stack overflow, which is a pretty serious error, since it crashes the whole application. If not stopped, can crash or damage the stack memory for the whole runtime.

#### Single-threading pros and cons

Running in a single-thread environment can be very liberating, since it's much simpler than running in a multi-threaded world where we'd have to care about racing conditions and deadlocks. In this world, such things do not exist, after all, we are doing only one thing at once.

However, single-threading can also be very limiting. Since we have a single stack, what would happen if this stacked is blocked by some slow-running code?

### Concurrency and Event Loop




## References

- [LibUV](https://github.com/libuv/libuv)
- [N-API](https://nodejs.org/api/n-api.html)
- [Esprima AST generator](https://esprima.org)
- [TurboFan docs](https://v8.dev/docs/turbofan)
- [TurboFan JIT](https://v8.dev/blog/turbofan-jit)
- [Native modules](https://nodejs.org/api/addons.html)
- [JS History](https://en.wikipedia.org/wiki/JavaScript)
- [Node.js history](https://en.wikipedia.org/wiki/Node.js)
- [Element Kinds in V8](https://v8.dev/blog/elements-kinds)
- [V8 Under the Hood](https://slides.com/igorfranca/v8-under-the-hood#/)
- [FS module source](https://github.com/nodejs/node/blob/master/lib/fs.js)
- [FS read_file_context source](https://github.com/nodejs/node/blob/master/lib/internal/fs/read_file_context.js)
- [V8 Under The Hood Examples](https://github.com/Horaddrim/v8-under-the-hood)
- [Internals of Node with crypto library](https://medium.com/front-end-weekly/internals-of-node-advance-node-%EF%B8%8F-8612f6a957d7)
- [Performance Optimizations in V8](https://v8-io12.appspot.com/index.html)
- [What are Stacks?](https://en.wikipedia.org/wiki/Stack_(abstract_data_type))
- [Compiler Optimization list](https://en.wikipedia.org/wiki/Optimizing_compiler)
- [Why is Node.js so Fast](https://blog.ghaiklor.com/2015/11/14/why-nodejs-is-so-fast/)
- [You don't know Node.js](https://medium.com/edge-coders/you-dont-know-node-6515a658a1ed)
- [V8 - A tale of Turbofan](https://dzone.com/articles/v8-behind-the-scenes-and-a-tale-of-turbofan)
- [Optimization tricks in V8](https://blog.ghaiklor.com/2016/04/05/optimizations-tricks-in-v8/#more-47)
- [V8 Internals for Developers](https://slidr.io/mathiasbynens/v8-internals-for-javascript-developers#1)
- [How V8 Optimizes the Code](https://blog.ghaiklor.com/2016/03/25/how-v8-optimises-javascript-code/#more-36)
- [My personal notes (in Portuguese) about V8](https://github.com/khaosdoctor/my-notes/blob/master/node/V8.md)
- [[BOOK] Node.js Under the Hood](https://resources.risingstack.com/Node.js+at+Scale+Vol.+2+-+Node.js+Under+the+Hood.pdf)
- [Tracing de-optimizations in Node.js](https://blog.ghaiklor.com/2016/05/16/tracing-de-optimizations-in-Node.js/#more-51)
- [JS Rendering Engine](https://blog.sessionstack.com/how-javascript-works-the-rendering-engine-and-tips-to-optimize-its-performance-7b95553baeda)
- [Memory Allocation in Javascript](https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec)
- [How JavaScript works: an overview of the engine, the runtime, and the call stack](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)
- [My talk guidelines (first version, incomplete, also in Portuguese) about this topic](https://github.com/khaosdoctor/my-notes/blob/master/node/Guideline%20de%20palestra%20the%20conf%202019.pdf)
- [How JavaScript works: inside the V8 engine + 5 tips on how to write optimized code](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)
- [[VIDEO] High performance JS in V8](https://www.youtube.com/watch?v=YqOhBezMx1o)
- [[VIDEO] Ryan Dahl's Introduction to Node.js](https://www.youtube.com/watch?v=jo_B4LTHi3I)
- [[VIDEO] BlinkOn 6 Day 1 Talk 2: Ignition - an interpreter for V8](https://www.youtube.com/watch?v=r5OWCtuKiAk)
- [[VIDEO] MNUG 2017.03.23 TurboFan: A new code generation architecture for V8](https://www.youtube.com/watch?v=M1FBosB5tjM)
- [[VIDEO] Benedikt Meurer: A Tale of TurboFan: Four years that changed V8 forever](https://www.youtube.com/watch?v=cvybnv79Sek)
- [[VIDEO] Marja Hölttä: Parsing JavaScript - better lazy than eager? | JSConf EU 2017](https://www.youtube.com/watch?v=Fg7niTmNNLg)
- [[VIDEO] Franziska Hinkelmann: JavaScript engines - how do they even? | JSConf EU 2017](https://www.youtube.com/watch?v=p-iiEDtpy6I)
- [[VIDEO] TDC 2017 - Stadium: How Node.js Works Internally by Kirmayr Tomaz (in Portuguese)](https://pt-br.eventials.com/Globalcode/tdc-sp-2017-stadium-quarta-5/)
