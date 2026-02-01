const express=require('express');
const app=express();
const cors=require('cors');
const { json } = require('body-parser');
//local module
const todorouter=require('./routers/homerouter');
const {connactionto_database}=require('./models/serverconnection');
const authenticationrouter=require('./routers/authenticationrouter');
//mailsender



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.use('/api',todorouter);
app.use('/api',authenticationrouter);



const port=3000;
connactionto_database(()=>{
require('./jobs/timesender');
app.listen(port,()=>{
  console.log(`Your server is running at http://localhost:3000`);
})
})
