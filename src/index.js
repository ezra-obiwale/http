const axios = require('axios')

const sendRequest = function (type, args) {
  const responseParams = (resp) => {
    try {
      return [resp.data, resp.status, resp.headers, resp]
    } catch (e) {
      return [e]
    }
  }

  let promise = new Promise(
    function (resolve, reject) {
      this.axios[type](...args)
        .then((resp) => {
          try {
            this.runBeforeResponse(resp)
            resolve(...responseParams(resp))
          } catch (e) {
            console.error('http', e.message)
          }
        })
        .catch((error) => {
          try {
            let resp = {
              status: -1,
              data: {
                message: error.request ? 'No response received' : error.message,
              },
              headers: [],
            }

            if (error.response) {
              resp = error.response
            }

            this.runBeforeResponse(resp, error)
            reject(...responseParams(resp))
          } catch (e) {
            console.error('http', e.message)
          }
        })
    }.bind(this)
  )

  if (this.useGlobalCatch && typeof this.globalCatch === 'function') {
    promise.catch(this.globalCatch)
  }

  this.useGlobalCatch = true

  return promise
}

export default class Http {
  /**
   * Class constructor
   * @param {object} options Axios options
   */
  constructor(options = {}) {
    this.axios = axios.create(options)
    this.axios.interceptors.request.use((config) => {
      config.headers = Object.assign({}, config.headers, this.headers)
      return config
    })

    this.useGlobalCatch = true
    this.headers = {}
    this.runBeforeResponse = (resp, error) => {}
  }

  delete() {
    return sendRequest.call(this, 'delete', arguments)
  }

  get() {
    return sendRequest.call(this, 'get', arguments)
  }

  head() {
    return sendRequest.call(this, 'head', arguments)
  }

  options() {
    return sendRequest.call(this, 'options', arguments)
  }

  patch() {
    return sendRequest.call(this, 'patch', arguments)
  }

  post() {
    return sendRequest.call(this, 'post', arguments)
  }

  put() {
    return sendRequest.call(this, 'put', arguments)
  }

  request() {
    return sendRequest.call(this, 'request', arguments)
  }

  beforeResponse(callback) {
    if (typeof callback == 'function') {
      this.runBeforeResponse = callback
    }
    return this
  }

  setGlobalCatch(func) {
    this.globalCatch = func
    return this
  }

  removeHeader(key) {
    delete this.headers[key]
    return this
  }

  setHeader(key, value) {
    this.headers[key] = value
    return this
  }

  setHeaders(headers) {
    if (typeof headers === 'object') {
      if (Array.isArray(headers)) {
        headers.forEach(({ name, value }) => {
          this.setHeader(name, value)
        })
      } else {
        for (let key in headers) {
          this.setHeader(key, headers[key])
        }
      }
    }
    return this
  }

  skipGlobalCatch() {
    this.useGlobalCatch = false
    return this
  }
}
