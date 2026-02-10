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
        TranModel.invest(data, callback);
    }

    static WithdrawCapital(data, callback) {
        TranModel.withdraw(data, callback);
    }

    static creditProfit(data, callback) {
        TranModel.profit(data, callback);
    }
}

module.exports = TranService;
