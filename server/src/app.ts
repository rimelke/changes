import 'reflect-metadata'
import './database'
import express from 'express'
import routes from './routes'
import cors from 'cors'
import morgan from 'morgan'

import errorMiddleware from './middlewares/ErrorMiddleware'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(routes)
app.use(errorMiddleware)

export default app
