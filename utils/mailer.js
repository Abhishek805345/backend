const nodemailer=require('nodemailer');


const Transporter=nodemailer.createTransport({
  secure:true,
  host:"smtp.gmail.com",
  auth:{
    user:"jakharabhi49@gmail.com",
    pass:"ndgfwrkiqblwgotn"
  }
}
)

exports.sendmail= async (to,Sub,mess)=>{
 return await Transporter.sendMail({
      from:"Todo App <jakharabhi49@gmail.com>",
      to:to,
      subject:Sub,
      html:mess
  })

}



