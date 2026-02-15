const util = require("../services/utilService");
const db = require('../database');

class PlanModel {
    static all(callback) {
        const qry = "SELECT * FROM plans WHERE pln_stat = 'AC'";
        db.all(qry, [], (err, res) => {
            if (!err && (res == undefined || res.length == 0) ) {
                err = new Error("Plans Not Found")
            }
            callback(err, res);
        });
    }

    static getById(id, callback) {
        const qry = "SELECT * FROM plans WHERE pln_stat = 'AC' AND pln_id = ?";
        db.get(qry, [id], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("Plan Not Found with given ID")
            }
            callback(err, res);
        });
    }

    static create(data, callback) {
        data.pln_stat= 'AC';

        const qry = 'INSERT INTO plans (pln_name, pln_freq, pln_inv, pln_roi, pln_dt1, pln_dt2, pln_stat) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *';
        db.get(qry, [data.pln_name, data.pln_freq, data.pln_inv, data.pln_roi, data.pln_dt1, data.pln_dt2, data.pln_stat], (err, row) => {
            callback(err, row);
        });
    }

    static update(id, data, callback) {
        const qry = 'UPDATE plans SET pln_name = ?, pln_freq = ?, pln_inv = ?, pln_roi = ?, pln_dt1 = ?, pln_dt2 = ? WHERE pln_stat = "AC" AND pln_id = ? RETURNING *';
        db.run(qry, [data.pln_name, data.pln_freq, data.pln_inv, data.pln_roi, data.pln_dt1, data.pln_dt2, id], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("Plan Not Found with given ID to Update")
            }
            callback(err, res);
        });
    }

    static delete(id, callback) {
        const qry = 'UPDATE plans SET pln_stat = "IA" WHERE pln_stat = "AC" AND pln_id = ? RETURNING *';
        db.run(qry, [id], (err, res) => {
            if (!err && res == undefined) {
                err = new Error("Plan Not Found with given ID to Delete")
            }
            callback(err, res);
        });
    }
}

module.exports = PlanModel;
