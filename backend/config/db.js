const mongoose=require('mongoose') ;
const connection= mongoose.connect("mongodb+srv://bisht:bisht@cluster0.vwvgviy.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0") ;
module.exports={connection}