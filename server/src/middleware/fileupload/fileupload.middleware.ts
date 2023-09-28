import asyncHandler from 'express-async-handler'
import httpErrors from 'http-errors'
import path from 'path'
import crypto from 'crypto'
import EnvConfig from '../../helpers/environment'
import { UploadedFile } from 'express-fileupload'

export default class FileUploadMiddleware {
    static filePayloadExists = asyncHandler(async (req, res, next) => {
        if (!req.files)
            throw httpErrors.NotAcceptable('No Image Provided.')
        next()
    })
}