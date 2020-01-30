class ApiError extends Error {
  constructor(code, message) {
    super()
    this.name = 'API_ERROR'
    this.code = code
    this.message = message
  }
}

class RunnerError extends Error {
  constructor(code, message) {
    super()
    this.name = 'RUNNER_ERROR'
    this.code = code
    this.message = message
  }
}

module.exports = {
  ApiError: ApiError,
  RunnerError: RunnerError,
}
