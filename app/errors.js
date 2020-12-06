class AppError extends Error {
  constructor (err) {
    super()
    let cause = err
    if (!(err instanceof Error)) cause = new Error(err.toString())
    this.name = this.constructor.name
    this.message = `AppError: ${cause.message}`
    this.cause = cause
  }
}

class DatabaseError extends AppError {}
class ResourceSearchError extends AppError {}
class ResourceWriteError extends AppError {}

module.exports.AppError = AppError
module.exports.DatabaseError = DatabaseError
module.exports.ResourceSearchError = ResourceSearchError
module.exports.ResourceWriteError = ResourceWriteError
