import { Request, Response } from 'express'

function errorMiddleware(e: Error, req: Request, res: Response) {
  console.error(e)
  res.status(400).json({ message: e.message || 'Unexpected error.' })
}

export default errorMiddleware
