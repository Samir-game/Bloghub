const {connectionDB}= require("./db/index.js")
const dotenv= require("dotenv")
const app= require("./app.js")

dotenv.config({
    path:"./.env"
})

connectionDB()
.then(()=>{
    app.listen(process.env.PORT || 80001,()=>{
        console.log("Server started at PORT: ",process.env.PORT)
    })
})
.catch((error)=>{
    console.log("error starting the server, mongodb error", error)
})