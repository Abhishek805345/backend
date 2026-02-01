const cron=require('node-cron');
const mailer=require('../utils/mailer');
const {outerclass}=require('../models/databasefxn');

cron.schedule('0 8 * * *',async ()=>{
  try{
    const sendingdate=new Date();
    sendingdate.setHours(0,0,0,0);

    const data=await outerclass.traverse();
   
    console.log("fetched data for checking due date=",data);
    for ( const task of data){
      const duedate=new Date(task.date);
      duedate.setHours(0,0,0,0);
      const diff=duedate-sendingdate;
      console.log("difference is=",diff);
      const diffintodays= Math.ceil(diff/(1000*60*60*24));
      console.log("difference in days is",diffintodays);

      if (diffintodays<=7 && diffintodays>0){
        const user=await outerclass.fetchbyid(task.userid);
        console.log("fetched data for user mail=",user);
        mailer.sendmail(user.email,"⏰ |Todo Reminder| ⏰",`Your task name=${task.task}.Please check the website for more details http://todo-frontend-nu-lake.vercel.app`);
      }
    }
  }catch(err){
  console.log("error ouccur:",err);
}
})