const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;

const url="mongodb+srv://Abhi_shek:17158894Jaat@firstproject.7epbjmq.mongodb.net/?appName=Firstproject";
let _db;
const connactionto_database=(callback)=>{
  MongoClient.connect(url).then(client=>{
    callback();
     _db=client.db('todo');
  }).catch(error=>{
    console.log('Error:Something went wrong',error);
  })
}

const getdb=()=>{
  if (_db)
  {
    return _db;
  }else{
    console.log("_db not found");
  }
}
exports.getdb=getdb;
exports.connactionto_database=connactionto_database;