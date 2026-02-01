const {outerclass}=require('../models/databasefxn');
const mailer=require('../utils/mailer');


exports.register=async (req,res,next)=>{
  const data=req.body;
  if (data.password==data.confirmPassword){
    const result=await outerclass.registerdata(data);
    res.json(result);
   if (result.acknowledged==true){
     mailer.sendmail(data.email,"Registration completed","Thanks for taking this service🤗🙏🏻");
   }  
  }else{
    res.json('Both the Password are different');
  }
}
exports.logincheck=async (req,res,next)=>{
  const data=req.body;
  try{
     const result=await outerclass.fetchuser(data.email);
       if (data.email==result.email && data.password==result.password){
       res.json({
        login:true,
        name:result.name,
        id:result._id
       })
      }
  }catch(error){
            res.json({
          login:false,
        });
  }
}
let otp;
//otp sender
exports.sendotp=async (req,res,next)=>{
  const data=req.body;
  const result=await outerclass.fetchuser(data.email);
  console.log(result);
  if (result!=null){
    userid=result._id;
    otp=Math.floor(1000+Math.random()*9000);
    const emailsenddata= await mailer.sendmail(result.email,"Forgot Password 🔐",`
       <h2>Forgot Password Request</h2>

    <p>Hello, ${result.name}</p>

    <p>
      We received a request to reset your account password.
      Please use the OTP below to continue:
    </p>

    <div class="otp">{{${otp}}}</div>

    <p>
      This OTP is valid for <strong>10 minutes</strong>.
      Do not share this code with anyone.
    </p>

    <p>
      If you did not request a password reset, please ignore this email.
    </p>
      `);
      res.json({
        id:result._id,
        status:true
      });
  }else{
    res.json({
      status:false
    })
  }
}
//verify otp
exports.verifyotp=async (req,res,next)=>{
  const id=req.params.id;
  const data=req.body;
  if (data.otp==otp){
    res.json({
      verify:true,
      userid:id
    })
  }else{
    res.json({
      verify:false,
      userid:id
    })
  }
}
//reset password
exports.resetpas=async (req,res,next)=>{
  const userid=req.params.id;
  const data=req.body;
  console.log("data is ",data)
  const result=await outerclass.resetpas(data,userid);
  console.log("final result is ",result);
  res.json(result);

}