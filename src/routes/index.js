import express from 'express'
import multer from 'multer'
import cloudinary from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import welcomeRoutes from "./api/welcomeRoutes"
import articleRoutes from "./api/articleRoutes"
import queryRoutes from "./api/queryRoutes"
import userRoutes from "./api/userRoutes"

const routes = express.Router()


cloudinary.v2.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'my-brand-images',
        public_id: (req, file) => {
            return new Date().toISOString().replaceAll(':', '-') + '-' + file.originalname;
        },
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/svg') {
        cb(null, true);
    } else {
        req.error = `${file.mimetype.split('/')[1]} is not an image`
        cb(null, false)
    }
}

const upload = multer({
    fileFilter: fileFilter,
    storage: storage
})

routes.use('/', welcomeRoutes)
routes.use('/articles',upload.single("image"), articleRoutes)
routes.use('/querries',upload.single(""), queryRoutes)
routes.use('/user', userRoutes)

export default routes