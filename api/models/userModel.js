const db = require('../database');

class UserModel {
    static all(callback) {
        db.all("SELECT * FROM users", [], callback);
    }

    static getById(id, callback) {
        db.get("SELECT * FROM users WHERE id = ?", [id], callback);
    }

    static create(user, callback) {
        const insert = 'INSERT INTO users (name, email) VALUES (?, ?)';
        db.run(insert, [user.name, user.email], function (err) {
            callback(err, this.lastID);
        });
    }

    static update(id, user, callback) {
        const update = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
        db.run(update, [user.name, user.email, id], function (err) {
            callback(err, this.changes);
        });
    }

    static delete(id, callback) {
        const del = 'DELETE FROM users WHERE id = ?';
        db.run(del, [id], function (err) {
            callback(err, this.changes);
        });
    }
}

module.exports = UserModel;
