const express=require('express')
const app=express();
const dotenv=require('dotenv')
dotenv.config();
const userRouter=require('./routes/user.routes')
const cookiePraser=require('cookie-parser');

app.set('view engine','ejs');

app.use(cookiePraser());

const connectToDB=require('./config/db')
connectToDB();


app.use('/user',userRouter)

app.listen(3000,()=>{
    console.log("Server is running")
})