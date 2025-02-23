import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Use env variables
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true", 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

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