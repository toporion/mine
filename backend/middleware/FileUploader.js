const multer=require('multer')
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const cloudinary=require('cloudinary')

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    cloud_key:process.env.CLOUD_API_KEY,
    cloud_secret:process.env.CLOUD_API_SECRET
})

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'uploads',
        format:async(req,file)=>'png',
        public_id:(req,file)=>file.originalname.split('.')[0] + ""
    }
})
const cloudinaryUploader=multer({storage:storage})
module.exports={cloudinaryUploader}