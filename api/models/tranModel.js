const util = require("../services/utilService");
const db = require('../database');

class TranModel {
    static all(callback) {
        const qry = "SELECT * FROM trans WHERE tran_stat = 'AC'";
        db.all(qry, [], (err, res) => {
            if (!err && (res == undefined || res.length == 0) ) {
                err = new Error("Trans Not Found")
            }
            callback(err, res);
        });
    }

    static getById(id, callback) {
        const qry = "SELECT * FROM trans WHERE tran_stat = 'AC' AND tran_id = ?";
        db.get(qry, [id], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("Tran Not Found with given ID")
            }
            callback(err, res);
        });
    }

    static getByUser(id, callback) {
        const qry = "SELECT * FROM trans WHERE tran_stat = 'AC' AND usr_id = ?";
        db.get(qry, [id], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("Trans Not Found with given User")
            }
            callback(err, res);
        });
    }

    static create(data, callback) {
        data.tran_stat= 'AC';

        const qry = 'INSERT INTO trans (tran_dt, usr_id, pln_id, tran_base, tran_dir, tran_amt, tran_rem, tran_stat) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING * ';
        db.run(qry, [data.tran_dt, data.usr_id, data.pln_id, data.tran_base, data.tran_dir, data.tran_amt, data.tran_rem, data.tran_stat], (err, row) => {
            callback(err, row);
        });
    }

    static delete(id, callback) {
        const qry = 'UPDATE trans SET tran_stat = "IA" WHERE tran_stat = "AC" AND tran_id = ? RETURNING tran_id';
        db.run(qry, [id], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("Tran Not Found with given ID to Delete")
            }
            callback(err, res);
        });
    }

    static invest(rdata, callback) {
        const data = {
            usr_id: rdata.usr_id, pln_id: rdata.pln_id,
            tran_dt: (rdata.tran_dt || util.getDateTime(false)),
            tran_base: "CAPITAL", tran_dir: "CR", 
            tran_amt: rdata.tran_amt, tran_rem: (rdata.tran_rem || 'investment'),
            tran_stat: "AC"
        }
        const qry = 'INSERT INTO trans (tran_dt, usr_id, pln_id, tran_base, tran_dir, tran_amt, tran_rem, tran_stat) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING tran_id';
        db.run(qry, [data.tran_dt, data.usr_id, data.pln_id, data.tran_base, data.tran_dir, data.tran_amt, data.tran_rem, data.tran_stat], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("Investment not updated")
            }
            callback(err, res);
        });
    }

    static withdraw(rdata, callback) {
        const data = {
            usr_id: rdata.usr_id, pln_id: rdata.pln_id,
            tran_dt: (rdata.tran_dt || util.getDateTime(false)),
            tran_base: "CAPITAL", tran_dir: "DB", 
            tran_amt: rdata.tran_amt, tran_rem: (rdata.tran_rem || 'withdraw'),
            tran_stat: "AC"
        }
        const qry = 'INSERT INTO trans (tran_dt, usr_id, pln_id, tran_base, tran_dir, tran_amt, tran_rem, tran_stat) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING tran_id';
        db.run(qry, [data.tran_dt, data.usr_id, data.pln_id, data.tran_base, data.tran_dir, data.tran_amt, data.tran_rem, data.tran_stat], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("Withdraw not updated")
            }
            callback(err, res);
        });
    }

    static profit(rdata, callback) {
        const data = {
            usr_id: rdata.usr_id, pln_id: rdata.pln_id,
            tran_dt: (rdata.tran_dt || util.getDateTime(false)),
            tran_base: "PROFIT", tran_dir: "CR", 
            tran_amt: rdata.tran_amt, tran_rem: (rdata.tran_rem || 'profit'),
            tran_stat: "AC"
        }
        const qry = 'INSERT INTO trans (tran_dt, usr_id, pln_id, tran_base, tran_dir, tran_amt, tran_rem, tran_stat) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING tran_id';
        db.run(qry, [data.tran_dt, data.usr_id, data.pln_id, data.tran_base, data.tran_dir, data.tran_amt, data.tran_rem, data.tran_stat], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("Profit not updated")
            }
            callback(err, res);
        });
    }
}

module.exports = TranModel;
