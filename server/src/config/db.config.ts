import mongoose from 'mongoose'
import EnvConfig from '../helpers/environment'
import ConsoleLogger from './console.config'

const connectDB = () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(EnvConfig.MONGO_URI)
        ConsoleLogger.info('Application Connected to MongoDB Server')
        process.on('SIGINT', () => {
            mongoose.connection.close()
            ConsoleLogger.error('Application Disconnected from MongoDB Server')
        })
    } catch (error) {
        ConsoleLogger.error('Could not connect to MongoDB Server')
    }
}

export default connectDB