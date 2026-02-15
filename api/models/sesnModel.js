const util = require("../services/utilService");
const db = require('../database');
const MailService = require("../services/mailService");

class SesnModel {
    static all(callback) {
        const qry = "SELECT * FROM sesnsvw WHERE ses_stat <> 'CL'";
        db.all(qry, [], (err, res) => {
            if (!err && (res == undefined || res.length == 0) ) {
                err = new Error("Sessions Not Found")
            }
            callback(err, res);
        });
    }

    static getById(id, callback) {
        const qry = "SELECT * FROM sesnsvw WHERE ses_stat <> 'CL' AND ses_id = ?";
        db.get(qry, [id], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("Session Not Found with given ID")
            }
            callback(err, res);
        });
    }

    static getByKey(key, callback) {
        const qry = "SELECT * FROM sesnsvw WHERE ses_stat <> 'CL' AND ses_key = ?";
        db.get(qry, [key], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("Session Not Found with given Key")
            }
            callback(err, res);
        });
    }

    static isActive(key, callback) {
        const qry = "SELECT * FROM sesnsvw WHERE ses_stat = 'OP' AND ses_key = ?";
        db.get(qry, [key], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("Session Not Found with given Key")
            }
            callback(err, res);
        });
    }

    static verifyPin(data, callback) {
        const ses_stat = "OP";
        const qry = 'UPDATE sesns SET ses_stat = ? WHERE ses_stat = "FR" AND usr_id = ? AND ses_key = ? AND ses_pin = ? RETURNING ses_key';
        db.get(qry, [ses_stat, data.usr_id, data.ses_key, data.ses_pin], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("Invalid PIN for this Session")
                callback(err, res);
            }
            else {
                this.getByKey(res.ses_key, callback);
            }
        });
    }

    static create(rdata, callback) {
        let data = {
            usr_id : rdata.usr_id,
            ses_key : util.getRandomKey(),
            ses_pin : util.getRandomPin(),
            ses_tm1 : util.getDateTime(true),
            ses_stat: 'FR'
        };

        const qry = 'INSERT INTO sesns (usr_id, ses_key, ses_pin, ses_tm1, ses_stat) VALUES (?, ?, ?, ?, ?) RETURNING *';
        db.get(qry, [data.usr_id, data.ses_key, data.ses_pin, data.ses_tm1, data.ses_stat], (err, row) => {
            if (!err && row == undefined) {
                err = new Error("Unable to create a Session")
            }
            callback(err, row);
        });
    }

    static close(rdata, callback) {
        let data = {
            usr_id  : rdata.usr_id,
            ses_key : rdata.ses_key,
            ses_tm2 : util.getDateTime(true),
            ses_stat: 'CL'
        };

        const qry = 'UPDATE sesns SET ses_tm2 = ?, ses_stat = ? WHERE ses_stat = "OP" AND ses_key = ? AND usr_id = ? RETURNING *';
        db.run(qry, [data.ses_tm2, data.ses_stat, data.ses_key, data.usr_id], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("Session Not Found with given Key to Close")
            }
            callback(err, res);
        });
    }

}

module.exports = SesnModel;
