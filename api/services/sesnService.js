const SesnModel = require('../models/sesnModel');

class SesnService {
    static getAllSesns(callback) {
        SesnModel.all(callback);
    }

    static getSesnById(id, callback) {
        SesnModel.getById(id, callback);
    }

    static getSesnByKey(key, callback) {
        SesnModel.getByKey(key, callback);
    }

    static createSesn(data, callback) {
        SesnModel.create(data, callback);
    }

    static closeSesn(data, callback) {
        SesnModel.close(data, callback);
    }
}

module.exports = SesnService;
