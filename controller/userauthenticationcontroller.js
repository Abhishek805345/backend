const {outerclass}=require('../models/databasefxn');
const mailer=require('../utils/mailer');


exports.register=async (req,res,next)=>{
  const data=req.body;
  if (data.password==data.confirmPassword){
    const result=await outerclass.registerdata(data);
    res.json(result);
   if (result.acknowledged==true){
     mailer.sendmail(data.email,"Registration completed",`
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Welcome to Todo</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    .header {
      background: linear-gradient(135deg, #4f46e5, #6366f1);
      color: #ffffff;
      padding: 24px;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
    }

    .content {
      padding: 32px;
      color: #333333;
      line-height: 1.6;
    }

    .content h2 {
      margin-top: 0;
      color: #111827;
    }

    .content p {
      margin: 12px 0;
      font-size: 15px;
    }

    .button {
      display: inline-block;
      margin: 24px 0;
      padding: 12px 28px;
      background-color: #4f46e5;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 6px;
      font-size: 15px;
      font-weight: bold;
    }

    .footer {
      background-color: #f9fafb;
      padding: 20px;
      text-align: center;
      font-size: 13px;
      color: #6b7280;
    }

    .footer a {
      color: #4f46e5;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <div class="container">
    <!-- HEADER -->
    <div class="header">
      <h1>✅ Welcome to Todo</h1>
    </div>

    <!-- CONTENT -->
    <div class="content">
      <h2>Hello,</h2>

      <p>
        Thank you for registering with <strong>Todo</strong>.
        Your account has been successfully created.
      </p>

      <p>
        Todo helps you organize your tasks, manage priorities,
        and stay productive every day.
      </p>

      <p>
        You can now log in and start managing your tasks.
      </p>

      <a href="https://todo-frontend-nu-lake.vercel.app/login" class="button">
        Login to Todo
      </a>

      <p>
        If you did not create this account, please ignore this email.
      </p>

      <p>
        Stay productive! 📝<br />
        <strong>Team Todo</strong>
      </p>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <p>© 2026 Todo. All rights reserved.</p>
      <p>
        Need help? <a href="mailto:support@todo.com">support@todo.com</a>
      </p>
    </div>
  </div>

</body>
</html>

      `);
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
