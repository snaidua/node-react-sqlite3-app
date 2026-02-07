const util = require("../services/utilService");
const db = require('../database');

class UserModel {
    static all(callback) {
        const qry = "SELECT * FROM users WHERE usr_stat = 'AC'";
        db.all(qry, [], callback);
    }

    static getById(id, callback) {
        const qry = "SELECT * FROM users WHERE usr_stat = 'AC' AND usr_id = ?";
        db.get(qry, [id], callback);
    }

    static create(data, callback) {
        data.usr_doj = util.getDateTime(false);
        data.usr_stat= 'AC';

        const qry = 'INSERT INTO users (usr_name, usr_mobi, usr_mail, usr_doj, usr_stat) VALUES (?, ?, ?, ?, ?)';
        db.run(qry, [data.usr_name, data.usr_mobi, data.usr_mail, data.usr_doj, data.usr_stat], function (err) {
            callback(err, this.lastID);
        });
    }

    static update(id, data, callback) {
        const qry = 'UPDATE users SET usr_name = ?, usr_mobi = ?, usr_mail = ? WHERE usr_stat = "AC" AND usr_id = ?';
        db.run(qry, [data.usr_name, data.usr_mobi, data.usr_mail, id], function (err) {
            callback(err, this.changes);
        });
    }

    static delete(id, callback) {
        const qry = 'UPDATE users SET usr_stat = "IA" WHERE usr_stat = "AC" AND usr_id = ?';
        db.run(qry, [id], function (err) {
            callback(err, this.changes);
        });
    }

    static account(id, data, callback) {
        const qry = 'UPDATE users SET usr_bank = ?, usr_acc = ?, usr_ifsc = ? WHERE usr_stat = "AC" AND usr_id = ?';
        db.run(qry, [data.usr_bank, data.usr_acc, data.usr_ifsc, id], function (err) {
            callback(err, this.changes);
        });
    }
}

module.exports = UserModel;
