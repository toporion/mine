const mongoose=require('mongoose')
const mongo_conn=process.env.MONGO_URL

mongoose.connect(mongo_conn)
.then((res)=>{
    console.log('Connected to MongoDB')
})