const express = require("express")
const mongoose = require("mongoose")
const routes  = require("./routes")
const cors = require('cors')

const app = express()
const PORT = 3000
const DBURL = "mongodb+srv://saranchakravarthy26:guvi@b49tamil.zmmqlo1.mongodb.net/"
app.use(express.json())
app.use(cors())

mongoose.connect(DBURL,{})
.then(()=>console.log("mongodb is connected succesfully")).catch((err)=>console.log("mongodb is not connected",err))

app.use('/api',routes)

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})
