const express=require('express') ;
const cors=require('cors') ;
const {connection}=require("./config/db.js") ;
const {todoRouter}=require("./routes/todo.Route.js")
const app= express() ;
app.use(cors()) ;
app.use(express.json()) ;

app.get("/" ,(req,res)=>{
    res.send("Hello worl")
})

app.use("/todo" ,todoRouter)
app.listen(8080 ,async (req,res)=>{
    try{
        await connection 
        console.log('connected to db') ;
        console.log("server is running on 8080 port")

    }catch(err){
        console.log(err ,"something went wrong")
    }
})
