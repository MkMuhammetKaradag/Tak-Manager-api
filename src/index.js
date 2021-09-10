import express from 'express'
import './db/mongoose.js'
import userRouters from "./routers/user.js";
import taskRouters from "./routers/task.js"
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config({ path: './config/dev.env'})
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouters)
app.use(taskRouters)




app.listen(port, () => {
    console.log("server is on port " + port)
})
