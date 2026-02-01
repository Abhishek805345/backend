const path=require('path');
//local module
const {outerclass}=require('../models/databasefxn')

exports.authcontroller=async (req,res,next)=>{
    console.log('received json data',req.body);
    const final=  await outerclass.savetodb(req.body);
    console.log('returned is ',final);
    res.json(final);
}
exports.getdatacontroller=async (req,res,next)=>{
  const id=req.params.id;
  const alldata=await outerclass.getfromdb(id);
  console.log(alldata);
  res.json(alldata);
}
exports.getinfo=async (req,res,next)=>{
  const id=req.params.id;
  console.log('fetched id is ',id);
  const datafetched=await outerclass.findbyid(id);
  console.log(datafetched);
  res.json(datafetched);
}
exports.updateinfo=async (req,res,next)=>{
  const id=req.params.id;
  const data=req.body;
  console.log(data);
  const result=await outerclass.updatebyid(data,id);
  res.json(result);
}
exports.delinfo=async (req,res,next)=>{
  const id=req.params.id;
  console.log("id is ",id);
  const result=await outerclass.delfxn(id);
  console.log(result);
  res.json(result);
}