const util = require("../services/utilService");
const db = require('../database');

class TranModel {
    static all(callback) {
        const qry = "SELECT * FROM trans WHERE tran_stat = 'AC'";
        db.all(qry, [], callback);
    }

    static getById(id, callback) {
        const qry = "SELECT * FROM trans WHERE tran_stat = 'AC' AND tran_id = ?";
        db.get(qry, [id], callback);
    }

    static create(data, callback) {
        data.tran_stat= 'AC';

        const qry = 'INSERT INTO trans (tran_dt, usr_id, pln_id, tran_base, tran_dir, tran_amt, tran_rem, tran_stat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(qry, [data.tran_dt, data.usr_id, data.pln_id, data.tran_base, data.tran_dir, data.tran_amt, data.tran_rem, data.tran_stat], function (err) {
            callback(err, this.lastID);
        });
    }

    static delete(id, callback) {
        const qry = 'UPDATE trans SET tran_stat = "IA" WHERE tran_stat = "AC" AND tran_id = ?';
        db.run(qry, [id], function (err) {
            callback(err, this.changes);
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
        const qry = 'INSERT INTO trans (tran_dt, usr_id, pln_id, tran_base, tran_dir, tran_amt, tran_rem, tran_stat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(qry, [data.tran_dt, data.usr_id, data.pln_id, data.tran_base, data.tran_dir, data.tran_amt, data.tran_rem, data.tran_stat], function (err) {
            callback(err, this.lastID);
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
        const qry = 'INSERT INTO trans (tran_dt, usr_id, pln_id, tran_base, tran_dir, tran_amt, tran_rem, tran_stat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(qry, [data.tran_dt, data.usr_id, data.pln_id, data.tran_base, data.tran_dir, data.tran_amt, data.tran_rem, data.tran_stat], function (err) {
            callback(err, this.lastID);
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
        const qry = 'INSERT INTO trans (tran_dt, usr_id, pln_id, tran_base, tran_dir, tran_amt, tran_rem, tran_stat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(qry, [data.tran_dt, data.usr_id, data.pln_id, data.tran_base, data.tran_dir, data.tran_amt, data.tran_rem, data.tran_stat], function (err) {
            callback(err, this.lastID);
        });
    }
}

module.exports = TranModel;
