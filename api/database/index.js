const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "./data.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');

        // Users
        db.run(`CREATE TABLE IF NOT EXISTS users (
                    usr_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    usr_name TEXT NOT NULL,
                    usr_mobi TEXT UNIQUE NOT NULL,
                    usr_mail TEXT UNIQUE NOT NULL,
                    usr_bank TEXT, usr_acc TEXT, usr_ifsc TEXT,
                    usr_doj TEXT NOT NULL,
                    usr_stat TEXT NOT NULL,
                    
                    CONSTRAINT user_unique UNIQUE (usr_mobi, usr_mail)
                )`, 
                (err) => {
                    if (err) { console.error(err); }
                }
            );

        // Sessions
        db.run(`CREATE TABLE IF NOT EXISTS sessions (
                    ses_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    usr_id INTEGER NOT NULL,
                    ses_tm1 TEXT NOT NULL,
                    ses_tm2 TEXT,
                    ses_stat TEXT NOT NULL,
                    
                    FOREIGN KEY (usr_id)
                        REFERENCES users (usr_id) 
                )`, 
                (err) => {
                    if (err) { console.error(err); }
                }
            );

        // Plans
        db.run(`CREATE TABLE IF NOT EXISTS plans (
                    pln_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    pln_name TEXT NOT NULL,
                    pln_freq TEXT NOT NULL,
                    pln_inv REAL NOT NULL,
                    pln_roi REAL NOT NULL,
                    pln_dt1 TEXT NOT NULL,
                    pln_dt2 TEXT NOT NULL,
                     pln_stat TEXT NOT NULL
                )`, 
                (err) => {
                    if (err) { console.error(err); }
                }
            );


        // User - Plan
        db.run(`CREATE TABLE IF NOT EXISTS userplans (
                    map_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    usr_id INTEGER NOT NULL,
                    pln_id INTEGER NOT NULL,
                    map_inv REAL NOT NULL,
                    map_roi REAL NOT NULL,
                    map_stat TEXT NOT NULL,

                    FOREIGN KEY (usr_id)
                        REFERENCES users (usr_id) 
                    FOREIGN KEY (pln_id)
                        REFERENCES plans (pln_id) 
                )`, 
                (err) => {
                    if (err) { console.error(err); }
                }
            );    

        
        // User - Tran
        db.run(`CREATE TABLE IF NOT EXISTS usertrans (
                    tran_id INTEGER PRIMARY KEY AUTOINCREMENT,

                    usr_id INTEGER NOT NULL,
                    pln_id INTEGER NOT NULL,
                    
                    tran_base TEXT NOT NULL,
                    tran_dir TEXT NOT NULL,
                    tran_amt REAL NOT NULL,
                    tran_stat TEXT NOT NULL,

                    FOREIGN KEY (usr_id)
                        REFERENCES users (usr_id) 
                    FOREIGN KEY (pln_id)
                        REFERENCES plans (pln_id) 
                )`, 
                (err) => {
                    if (err) { console.error(err); }
                }
            );    
    }
});

module.exports = db;
