const nodemailer = require('nodemailer');
const Config = require("./../config");

class MailService {

    static send(data, callback) {

        const mail = Config.MAIL;
        let transporter = nodemailer.createTransport({
            host: mail.SERVER_HOST,
            port: mail.SERVER_PORT,
            secure: mail.SERVER_SSL,
            auth: {
                user: mail.USER_ID,
                pass: mail.USER_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        }); 

        let mailOptions = {
            from: mail.USER_MAIL,
            to: data.to,
            subject: data.sub,
            text: data.body
        };

        transporter.sendMail(mailOptions, callback);
    }
}

module.exports = MailService;