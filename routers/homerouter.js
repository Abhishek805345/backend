//external module
const express=require('express');
const authrouter=express();
//local module
const todocontroller=require('../controller/authcontroller')


authrouter.post('/todo/login',todocontroller.authcontroller);
authrouter.get('/mydata/:id',todocontroller.getdatacontroller);
authrouter.get('/edit/:id',todocontroller.getinfo);
authrouter.post('/accept/data/:id',todocontroller.updateinfo);
authrouter.delete('/info/delete/:id',todocontroller.delinfo);

module.exports=authrouter;