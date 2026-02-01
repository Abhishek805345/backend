const {mongo, ObjectId}=require('mongodb');
const {getdb}=require('./serverconnection');
const { get } = require('../routers/homerouter');

class outerclass{
  static savetodb(data){
    const _db=getdb();
    return _db.collection('data').insertOne(data);
  }
  static traverse(){
    const _db=getdb();
    return _db.collection('data').find().toArray();
  }
  static getfromdb(userid){
    const _db=getdb();
    return _db.collection('data').find({userid:userid}).toArray();
  }
  static findbyid(id){
    const _db=getdb();
    return _db.collection('data').find({_id:new ObjectId(id)}).next();
  }
  static updatebyid(data,id){
    const _db=getdb();
    return _db.collection('data').updateOne({_id:new ObjectId(id)},{$set:data});
  }
  static delfxn(id){
    const _db=getdb();
    return _db.collection('data').deleteOne({_id:new ObjectId(id)});
  }
//fxns for userdata
  //save new user
  static registerdata(data){
    const _db=getdb();
    return _db.collection('userdata').insertOne(data);
  }
  //fetch exsiting user details
  static fetchuser(email){
    const _db=getdb();
    return _db.collection('userdata').find({email:email}).next();
  }
  //fetching user data through user _id
  static fetchbyid(id){
    const _db=getdb();
    return _db.collection('userdata').find({_id:new ObjectId(id)}).next();
  }
  //for saving new password
   static resetpas(data,id){
    const _db=getdb();
    return _db.collection('userdata').updateOne({_id:new ObjectId(id)},{$set:data});
  }


}


exports.outerclass=outerclass;