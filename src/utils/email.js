const nodemailer = require('nodemailer')

/**
 * Send email to any email address
 * @param  {String} receiverEmail Email of the receiver
 * @param  {String} mailBody Content of the mail to be sent
 * @param  {String} emailSubject Subject of the email to be sent
 */
const sendEmail = (receiverEmail, mailBody, emailSubject) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    })

    const mailOptions = {
        from: `${process.env.SENDER_NAME} <${process.env.SENDER_ADDRESS}>`,
        to: receiverEmail,
        subject: emailSubject,
        html: mailBody,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            // console.log('Email Send', info.response)
        }
    })
}

module.exports = {
    sendEmail,
}
