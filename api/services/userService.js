const UserModel = require('../models/userModel');
const SesnModel = require('../models/sesnModel');
const MailService = require('./mailService');

class UserService {
    static getAllUsers(callback) {
        UserModel.all(callback);
    }

    static getUserById(id, callback) {
        UserModel.getById(id, callback);
    }

    static createUser(data, callback) {
        UserModel.create(data, callback);
    }

    static updateUser(id, data, callback) {
         UserModel.update(id, data, callback);
    }

    static deleteUser(id, callback) {
        UserModel.delete(id, callback);
    }

    static updateAccount(id, data, callback) {
        UserModel.account(id, data, callback);
    }

    static getPlans(id, callback) {
        UserModel.plans(id, callback);
    }

    static getTrans(id, callback) {
        UserModel.trans(id, callback);
    }

    static loginByMail(data, callback) {
        UserModel.getByMail(data, (err, user) => {
            if (err) {
                callback(err, null);
            }
            else {
                SesnModel.create(user, (err, sesn) => {
                    if (err) {
                        callback(err, null);
                    }
                    else {
                        const res = {
                            mbody: { "to": user.usr_mail, "sub": "OTP to Authenticate", "body": "Your OTP is " + sesn.ses_pin },
                            mdata: { ...user, ses_key: sesn.ses_key }
                        }
                        MailService.send(res.mbody, (err, info) => {
                            callback(err, res.mdata);
                        })
                    }
                });
            }
        })
    }

    static verifyByPin(data, callback) {
            SesnModel.verifyPin(data, (err, res) => {
                callback(err, res);
            });
    }
}

module.exports = UserService;
