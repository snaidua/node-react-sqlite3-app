const UserModel = require('../models/userModel');

class UserService {
    static getAllUsers(callback) {
        UserModel.all(callback);
    }

    static getUserById(id, callback) {
        UserModel.getById(id, callback);
    }

    static createUser(user, callback) {
        // Add any validation or business logic here
        if (!user.name || !user.email) {
            return callback(new Error("Name and email are required."));
        }
        UserModel.create(user, callback);
    }

    static updateUser(id, user, callback) {
        // Add any validation or business logic here
        UserModel.update(id, user, callback);
    }

    static deleteUser(id, callback) {
        UserModel.delete(id, callback);
    }
}

module.exports = UserService;
