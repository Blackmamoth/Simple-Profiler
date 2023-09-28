import { UploadedFile } from "express-fileupload";
import ConsoleLogger from "../config/console.config";
import EnvConfig from "./environment";
import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'

function generateNewName(file: UploadedFile): string {
    const newName = crypto.randomUUID().toString()
    const ext = path.extname(file.name)
    return `${newName}${ext}`
}

const writeFile = async (files: UploadedFile[]): Promise<string[]> => {
    try {
        const { APP_MEDIA_PATH } = EnvConfig
        const newNames: string[] = []
        const mediaPath = APP_MEDIA_PATH
        if (!fs.existsSync(mediaPath))
            await fs.promises.mkdir(mediaPath, { recursive: true })
        files.forEach(async file => {
            const newName = generateNewName(file)
            const filePath = path.join(mediaPath, newName)
            file.name = newName
            newNames.push(newName)
            await file.mv(filePath)
        })
        return newNames
    } catch (error) {
        ConsoleLogger.error('Could not upload file to server.')
        return []
    }
}

export { writeFile }