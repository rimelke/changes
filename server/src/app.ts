import 'reflect-metadata'
import './database'
import express from 'express'
import routes from './routes'
import { errors } from 'celebrate'
import cors from 'cors'
import morgan from 'morgan'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(routes)
app.use(errors())

export default app
