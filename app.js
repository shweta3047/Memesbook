const express=require('express');
const app=express();
const cors=require('cors')
const mongoose=require('mongoose');
const PORT=process.env.PORT || 5000;
const {MONGOURI}=require('./config/keys');

mongoose.connect(MONGOURI,{useNewUrlParser:true,useUnifiedTopology: true});
mongoose.connection.on('connected',()=>{
    console.log('Database connected!!')
})
mongoose.connection.on('error',(err)=>{
    console.log('error in connecting to database ',err)
})



require('./models/user');
require('./models/post')

app.use(express.json());
app.use(cors())
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/users'));

app.listen(PORT,()=>{
    console.log("server is running on ",PORT);
})