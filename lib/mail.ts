import nodemailer from 'nodemailer'
const  transporter = nodemailer.createTransport({
  host: 'mail.architecture-academics.online',
  port: 465, // Try 587 instead of 465
  secure: true, // Use false for TLS
  auth: {
    user: 'admin@architecture-academics.online',
    pass: 'wt_,Wd+q,X1&'
  },
  tls:{
    rejectUnauthorized:false
  }
});


export const sendEmail=(tomail:string,file:string,path:string)=>{
    const mailOptions = {
        from: 'admin@architecture-academics.online',
        to: tomail,
        subject: 'Sending Email using Node.js',
        html: '<h1>That was easy!</h1>',
        attachments: [
          {
              filename: file, // The name of the file when attached
              path: path, // Path to the PDF file
          },
      ],
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}