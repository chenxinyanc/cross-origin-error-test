# cross-origin-error-test

Start a web server (e.g., with `http-server` npm package) in the repo root. It should serve the files at localhost:8080

```
PS > http-server --cors

Starting up http-server, serving ./

http-server version: 14.1.1

http-server settings: 
CORS: true
Cache: 3600 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none

Available on:
  http://127.0.0.1:8080
```

Open `index.html` **from local file system** (i.e., file:///.../cross-origin-error-test/index.html). You should see a sync error and an async error thrown from `http://localhost:8080/script2.js`:

```
script1.js:2 Script 1 error Script error. null
script2.js:2 Script 2 error Script error. null
script2.js:14  Uncaught Error: Sync error from script2
    at throwAnError2 (script2.js:14:11)
    at script2.js:18:25
script2.js:11  Uncaught (in promise) Error: Async error from script2
    at throwAsyncError2 (script2.js:11:15)
    at throwAnError2 (script2.js:13:5)
    at script2.js:18:25
```

But only the sync error is observed by the hander, with redacted error message.

Update `index.html`, adding `crossorigin` to the `<script>` tag

```diff
- <script src="http://localhost:8080/script2.js"></script>
+ <script src="http://localhost:8080/script2.js" crossorigin="anonymous"></script>
```

Refresh the browser page. You should see the same errors but this time you can see their details

```
Script 1 error Uncaught Error: Sync error from script2 Error: Sync error from script2
    at throwAnError2 (script2.js:14:11)
    at script2.js:18:25
script2.js:2 Script 2 error Uncaught Error: Sync error from script2 Error: Sync error from script2
    at throwAnError2 (script2.js:14:11)
    at script2.js:18:25
script2.js:14  Uncaught Error: Sync error from script2
    at throwAnError2 (script2.js:14:11)
    at script2.js:18:25
script1.js:6 Script 1 unhandledrejection Error: Async error from script2
    at throwAsyncError2 (script2.js:11:15)
    at throwAnError2 (script2.js:13:5)
    at script2.js:18:25
script2.js:6 Script 2 unhandledrejection Error: Async error from script2
    at throwAsyncError2 (script2.js:11:15)
    at throwAnError2 (script2.js:13:5)
    at script2.js:18:25
script2.js:11  Uncaught (in promise) Error: Async error from script2
    at throwAsyncError2 (script2.js:11:15)
    at throwAnError2 (script2.js:13:5)
    at script2.js:18:25
```
