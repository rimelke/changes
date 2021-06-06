import 'reflect-metadata'
import './database'
import 'express-async-errors'
import express from 'express'
import routes from './routes'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'

import errorMiddleware from './middlewares/errorMiddleware'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(routes)
app.use('/public', express.static(path.resolve(__dirname, '..', 'public')))
app.use(errorMiddleware)

export default app
