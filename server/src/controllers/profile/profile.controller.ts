import * as JoiProfile from '../../helpers/joi/profile'
import asyncHandler from 'express-async-handler'
import ProfileModel from '../../models/profile/profile.model'
import { writeFile } from '../../helpers/backend.functions'
import { UploadedFile } from 'express-fileupload'
import EnvConfig from '../../helpers/environment'

export default class ProfileController {
    static createProfile = asyncHandler(async (req, res) => {
        const profileDetails: JoiProfile.CreateProfile = await JoiProfile.createProfileSchema.validateAsync(req.body)
        const { FILE_OBJECT_NAME } = EnvConfig
        const files = Array.isArray(req?.files?.[FILE_OBJECT_NAME]) ? req?.files?.[FILE_OBJECT_NAME] : [req?.files?.[FILE_OBJECT_NAME]]
        const fileNames = await writeFile(files as unknown as UploadedFile[])
        const profile = new ProfileModel({
            name: profileDetails.name,
            description: profileDetails.description,
            age: profileDetails.age,
            dob: profileDetails.dob,
            fileNames: fileNames
        })
        await profile.save()
        if (!res.headersSent)
            res.status(200).send({
                error: false,
                data: {
                    profile: {
                        profileId: profile._id,
                        name: profile.name,
                        age: profile.age,
                        description: profile.description,
                        fileNames: profile.fileNames
                    },
                    message: "Profile was created successfully."
                }
            })
    })
}