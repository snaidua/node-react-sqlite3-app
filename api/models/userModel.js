const util = require("../services/utilService");
const db = require('../database');

class UserModel {
    static all(callback) {
        const qry = "SELECT * FROM usersvw";
        db.all(qry, [], (err, res) => {
            if (!err && (res == undefined || res.length == 0) ) {
                err = new Error("Users Not Found")
            }
            callback(err, res);
        });
    }

    static getById(id, callback) {
        const qry = "SELECT * FROM users WHERE usr_stat = 'AC' AND usr_id = ?";
        db.get(qry, [id], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("User Not Found with given ID")
            }
            callback(err, res);
        });
    }

    static getByMail(data, callback) {
        const qry = "SELECT * FROM users WHERE usr_stat = 'AC' AND usr_mail = ?";
        db.get(qry, [data.usr_mail], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("User Not Found with given Mail");
            }
            callback(err, res);
        });
    }

    static create(data, callback) {
        data.usr_doj = util.getDateTime(false);
        data.usr_stat= 'AC';

        const qry = 'INSERT INTO users (usr_name, usr_mobi, usr_mail, usr_doj, usr_stat) VALUES (?, ?, ?, ?, ?) RETURNING *';
        db.get(qry, [data.usr_name, data.usr_mobi, data.usr_mail, data.usr_doj, data.usr_stat], (err, row) => {
            callback(err, row);
        });
    }

    static update(id, data, callback) {
        const qry = 'UPDATE users SET usr_name = ?, usr_mobi = ?, usr_mail = ? WHERE usr_stat = "AC" AND usr_id = ? RETURNING usr_id';
        db.get(qry, [data.usr_name, data.usr_mobi, data.usr_mail, id], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("User Not Found with given ID to Update")
            }
            callback(err, res);
        });
    }

    static delete(id, callback) {
        const qry = 'UPDATE users SET usr_stat = "IA" WHERE usr_stat = "AC" AND usr_id = ? RETURNING usr_id';
        db.run(qry, [id], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("User Not Found with given ID to Delete")
            }
            callback(err, res);
        });
    }

    static account(id, data, callback) {
        const qry = 'UPDATE users SET usr_bank = ?, usr_acc = ?, usr_ifsc = ? WHERE usr_stat = "AC" AND usr_id = ? RETURNING usr_id';
        db.run(qry, [data.usr_bank, data.usr_acc, data.usr_ifsc, id], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("User Not Found with given ID to Update")
            }
            callback(err, res);
        });
    }

    static plans(id, callback) {
        const qry = 'SELECT * FROM userplans WHERE map_stat = "AC" AND usr_id = ?';
        db.all(qry, [id], (err, res) => {
            if (!err && (res == undefined || res.length == 0) ) {
                err = new Error("Plans Not Found with given ID")
            }
            callback(err, res);
        });
    }

    static trans(id, callback) {
        const qry = 'SELECT * FROM trans WHERE tran_stat = "AC" AND usr_id = ?';
        db.all(qry, [id], (err, res) => {
            if (!err && (res == undefined || res.length == 0) ) {
                err = new Error("Transactions Not Found with given ID")
            }
            callback(err, res);
        });
    }
}

module.exports = UserModel;
