import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'joi'
import AppError from '../errors/AppError'

const errorMiddleware: ErrorRequestHandler = (e, req, res, next) => {
  if (e instanceof ValidationError) {
    return res.status(400).json({ message: e.message || 'Validation error.' })
  }

  if (e instanceof AppError) {
    return res.status(e.statusCode).json({ message: e.message })
  }

  console.error(e)

  return res.status(500).json({ message: e.message || 'Unexpected error.' })
}

export default errorMiddleware
