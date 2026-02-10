const nodemailer = require('nodemailer');

class MailService {

    static send(data, callback) {

        require('dotenv').config();
        const evar = process.env;

        let transporter = nodemailer.createTransport({
            service: evar.SERVER_NAME,
            port: evar.SERVER_PORT,
            auth: {
                user: evar.USER_ID,
                pass: evar.USER_PASS
            }
        }); 

        let mailOptions = {
            from: evar.USER_MAIL,
            to: data.to,
            subject: data.sub,
            text: data.body
        };

        transporter.sendMail(mailOptions, callback);
    }
}


module.exports = MailService;