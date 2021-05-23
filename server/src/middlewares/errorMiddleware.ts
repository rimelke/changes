import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'joi'

const errorMiddleware: ErrorRequestHandler = (e, req, res) => {
  if (e instanceof ValidationError) {
    return res.status(400).json({ message: e.message || 'Validation error.' })
  }

  console.error(e)
  return res.status(400).json({ message: e.message || 'Unexpected error.' })
}

export default errorMiddleware
