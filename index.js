const express=require('express');

const cors =require('cors');
require('dotenv').config()

const mongoose=require('mongoose')
const app=express()
app.use(express.json())
app.use(cors())


const UserRouter=require('./routers/userrouter')

app.use('/user',UserRouter)


app.get('/',(req,res)=>{
    res.send('welcom to my app')
})

//connect to mongodb

/*mongoose.set("strictQuery", false);
mongoose.connect(process.env.urlMongo).then(() => {
    console.log("Succesfull Connected to DB!");
}).catch((error) => {
    console.log(error.message);
})*/
const URI=process.env.mongo_db

mongoose.connect('mongodb://localhost:27017/Db_test',{
  
    useNewUrlParser:true,
    useUniFiedTopology:true

},err=>{
    if(err) throw err;
    console.log('Connect to Mongo DB ')
})

const port=process.env.port
app.listen(port,()=>{
console.log(' app connect at port ',port)
}
)


