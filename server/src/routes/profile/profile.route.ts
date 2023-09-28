import { Router } from 'express'
import ProfileController from '../../controllers/profile/profile.controller'
import FileUploadMiddleware from '../../middleware/fileupload/fileupload.middleware'
import expressFileUpload from 'express-fileupload'

const profileRouter = Router()

profileRouter.post('/create-profile', expressFileUpload({ createParentPath: true }), FileUploadMiddleware.filePayloadExists, ProfileController.createProfile)

export default profileRouter