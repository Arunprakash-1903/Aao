import nodemailer from 'nodemailer'
const  transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arunprakash2225@gmail.com',
    pass: 'pxpz psuh kfku umob'
  }
});


export const sendEmail=(tomail:string,file:string,path:string)=>{
    const mailOptions = {
        from: 'arunprakash225@gmail.com',
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