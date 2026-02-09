const TranModel = require('../models/tranModel');

class TranService {
    static getAllTrans(callback) {
        TranModel.all(callback);
    }

    static getTranById(id, callback) {
        TranModel.getById(id, callback);
    }

    static createTran(data, callback) {
        /*
        if (!user.usr_name || !user.usr_mobi || !user.usr_mail) {
            return callback(new Error(user));
        }
        */
        TranModel.create(data, callback);
    }

    static deleteTran(id, callback) {
        TranModel.delete(id, callback);
    }

    static InvestCapital(data, callback) {
        data.tran_base = "CAPITAL";
        data.tran_dir = "CR";

        TranModel.create(data, callback);
    }

    static WithdrawCapital(data, callback) {
        data.tran_base = "CAPITAL";
        data.tran_dir = "DB";

        TranModel.create(data, callback);
    }

    static creditProfit(data, callback) {
        data.tran_base = "PROFIT";
        data.tran_dir = "CR";

        TranModel.create(data, callback);
    }
}

module.exports = TranService;
