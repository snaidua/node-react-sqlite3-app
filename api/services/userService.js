const UserModel = require('../models/userModel');

class UserService {
    static getAllUsers(callback) {
        UserModel.all(callback);
    }

    static getUserById(id, callback) {
        UserModel.getById(id, callback);
    }

    static createUser(data, callback) {
        /*
        if (!user.usr_name || !user.usr_mobi || !user.usr_mail) {
            return callback(new Error(user));
        }
        */
        UserModel.create(data, callback);
    }

    static updateUser(id, data, callback) {
        // Add any validation or business logic here
        UserModel.update(id, data, callback);
    }

    static deleteUser(id, callback) {
        UserModel.delete(id, callback);
    }

    static updateAccount(id, data, callback) {
        // Add any validation or business logic here
        UserModel.account(id, data, callback);
    }

    static getPlans(id, callback) {
        UserModel.plans(id, callback);
    }

    static getTrans(id, callback) {
        UserModel.trans(id, callback);
    }
}

module.exports = UserService;
