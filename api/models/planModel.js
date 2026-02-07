const util = require("../services/utilService");
const db = require('../database');

class PlanModel {
    static all(callback) {
        const qry = "SELECT * FROM plans WHERE pln_stat = 'AC'";
        db.all(qry, [], callback);
    }

    static getById(id, callback) {
        const qry = "SELECT * FROM plans WHERE pln_stat = 'AC' AND pln_id = ?";
        db.get(qry, [id], callback);
    }

    static create(data, callback) {
        data.pln_stat= 'AC';

        const qry = 'INSERT INTO plans (pln_name, pln_freq, pln_inv, pln_roi, pln_dt1, pln_dt2, pln_stat) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.run(qry, [data.pln_name, data.pln_freq, data.pln_inv, data.pln_roi, data.pln_dt1, data.pln_dt2, data.pln_stat], function (err) {
            callback(err, this.lastID);
        });
    }

    static update(id, data, callback) {
        const qry = 'UPDATE plans SET pln_name = ?, pln_freq = ?, pln_inv = ?, pln_roi = ?, pln_dt1 = ?, pln_dt2 = ? WHERE pln_stat = "AC" AND pln_id = ?';
        db.run(qry, [data.pln_name, data.pln_freq, data.pln_inv, data.pln_roi, data.pln_dt1, data.pln_dt2, id], function (err) {
            callback(err, this.changes);
        });
    }

    static delete(id, callback) {
        const qry = 'UPDATE plans SET pln_stat = "IA" WHERE pln_stat = "AC" AND pln_id = ?';
        db.run(qry, [id], function (err) {
            callback(err, this.changes);
        });
    }
}

module.exports = PlanModel;
