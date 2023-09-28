import express, { Request, Response, NextFunction } from 'express'
import ConsoleLogger from './config/console.config'
import httpErrors from 'http-errors'
import cors from 'cors'
import EnvConfig from './helpers/environment'
import connectDB from './config/db.config'
import profileRouter from './routes/profile/profile.route'

const app = express()
const { APP_PORT } = EnvConfig

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/profile', profileRouter)

app.use((req, _, next) => {
    next(httpErrors.NotFound(`Route not found for [${req.method}] ${req.url}.`))
})

app.use((error: { message?: string, status?: number, isJoi?: boolean }, req: Request, res: Response, next: NextFunction): void => {
    console.log(error)
    const message = error?.message || `Cannot resolve request [${req.method}] ${[req.url]}.`
    let status = error?.status || 500
    if (error?.isJoi)
        status = 422
    if (!res.headersSent)
        res.status(status).send({
            error: {
                message,
                status
            }
        })
})

app.listen(APP_PORT, () => {
    ConsoleLogger.start(`Application running on port ${APP_PORT}.`)
    connectDB()
})

process.on('SIGINT', () => {
    ConsoleLogger.error('Application Terminated.')
})