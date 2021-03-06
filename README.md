# Http

A wrapper around axios

## Installation

```
yarn add @ezraobiwale/http
```

or

```
<script src="https://cdn.jsdelivr.net/npm/@ezraobiwale/http@2.0.1/dist/http.js"></script>
```

## Usage

1. In node js app:

```
const Http = require('@ezraobiwale/http')

const http = new Http()
```

2. In browser app:

```
const http = new window.Http()
```

## Features

Supports all features of axios, with a few additional methods:

- `beforeResponse(fn)`: Accepts a function to call on all responses before resolving. The response can be tweaked here.
- `setHeader(key, value)`: Sets a header for all requests
- `removeHeader(key)`: Removes a previously header from all requests
- `setGlobalCatch(fn)`: Accepts a function to process all request errors
- `skipGlobalCatch()`: Indicates that the global catch should not apply to the next request.
