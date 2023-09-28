import { config } from 'dotenv'

config()

class Environment {
    static getEnvironmentString = (key: string): string => process.env[key] || ''

    static getEnvironmentNumber = (key: string): number => Number(process.env[key]) || Number('')
}

const EnvConfig = {
    MONGO_URI: Environment.getEnvironmentString('MONGO_URI'),
    APP_PORT: Environment.getEnvironmentNumber('APP_PORT'),
    FILE_OBJECT_NAME: Environment.getEnvironmentString('FILE_OBJECT_NAME'),
    APP_MEDIA_PATH: Environment.getEnvironmentString('APP_MEDIA_PATH')
}

export default EnvConfig