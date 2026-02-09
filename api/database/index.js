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
                    ses_key TEXT NOT NULL,
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
        db.run(`CREATE TABLE IF NOT EXISTS trans (
                    tran_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    tran_dt TEXT NOT NULL,
                    
                    usr_id INTEGER NOT NULL,
                    pln_id INTEGER NOT NULL,
                    
                    tran_base TEXT NOT NULL,
                    tran_dir TEXT NOT NULL,
                    tran_amt REAL NOT NULL,
                    tran_rem TEXT NOT NULL,
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

        db.run(`CREATE TEMP VIEW IF NOT EXISTS usersView
                AS
                    SELECT * FROM users
                    WHERE usr_stat = 'AC'
                `,
                (err) => {
                    if (err) { console.error(err); }
                }
        )

        db.run(`CREATE TRIGGER IF NOT EXISTS transInsertCapitalTrigger
                AFTER INSERT
                ON trans
                FOR EACH ROW
                WHEN NEW.tran_base = 'CAPITAL'
                BEGIN
                    UPDATE  userPlans
                        SET map_inv = map_inv + (CASE WHEN NEW.tran_dir = 'CR' THEN 1 ELSE -1 END) * NEW.tran_amt
                    WHERE   usr_id = NEW.usr_id AND pln_id = NEW.pln_id;

                    INSERT INTO userPlans (usr_id, pln_id, map_inv, map_roi, map_stat)
                    SELECT NEW.usr_id, NEW.pln_id, NEW.tran_amt, 0, 'AC'
                    WHERE NOT EXISTS ( SELECT 'X' FROM trans WHERE usr_id = NEW.usr_id AND pln_id = NEW.pln_id ) AND NEW.tran_dir = 'CR';
                END
                `,
            (err) => {
                if (err) { console.error(err); }
            }
        )

        db.run(`CREATE TRIGGER IF NOT EXISTS transUpdateCapitalTrigger
                AFTER UPDATE
                ON trans
                FOR EACH ROW
                WHEN NEW.tran_base = 'CAPITAL'
                BEGIN
                    UPDATE  userPlans
                        SET map_inv = map_inv + (CASE WHEN OLD.tran_dir = 'CR' THEN -1 ELSE 1 END) * OLD.tran_amt
                    WHERE   usr_id = OLD.usr_id AND pln_id = OLD.pln_id;

                    UPDATE  userPlans
                        SET map_inv = map_inv + (CASE WHEN NEW.tran_dir = 'CR' THEN 1 ELSE -1 END) * NEW.tran_amt
                    WHERE   usr_id = NEW.usr_id AND pln_id = NEW.pln_id;

                    INSERT INTO userPlans (usr_id, pln_id, map_inv, map_roi, map_stat)
                    SELECT NEW.usr_id, NEW.pln_id, NEW.tran_amt, 0, 'AC'
                    WHERE NOT EXISTS ( SELECT 'X' FROM trans WHERE usr_id = NEW.usr_id AND pln_id = NEW.pln_id ) AND NEW.tran_dir = 'CR';
                END
                `,
            (err) => {
                if (err) { console.error(err); }
            }
        )

                db.run(`CREATE TRIGGER IF NOT EXISTS transInsertProfitTrigger
                AFTER INSERT
                ON trans
                FOR EACH ROW
                WHEN NEW.tran_base = 'PROFIT'
                BEGIN
                    UPDATE  userPlans
                        SET map_inv = map_inv + (CASE WHEN NEW.tran_dir = 'CR' THEN 1 ELSE -1 END) * NEW.tran_amt
                    WHERE   usr_id = NEW.usr_id AND pln_id = NEW.pln_id;

                    INSERT INTO userPlans (usr_id, pln_id, map_inv, map_roi, map_stat)
                    SELECT NEW.usr_id, NEW.pln_id, NEW.tran_amt, 0, 'AC'
                    WHERE NOT EXISTS ( SELECT 'X' FROM trans WHERE usr_id = NEW.usr_id AND pln_id = NEW.pln_id ) AND NEW.tran_dir = 'CR';
                END
                `,
            (err) => {
                if (err) { console.error(err); }
            }
        )

        db.run(`CREATE TRIGGER IF NOT EXISTS transUpdateProfitTrigger
                AFTER UPDATE
                ON trans
                FOR EACH ROW
                WHEN NEW.tran_base = 'PROFIT'
                BEGIN
                    UPDATE  userPlans
                        SET map_roi = map_roi + (CASE WHEN OLD.tran_dir = 'CR' THEN -1 ELSE 1 END) * OLD.tran_amt
                    WHERE   usr_id = OLD.usr_id AND pln_id = OLD.pln_id;

                    UPDATE  userPlans
                        SET map_roi = map_roi + (CASE WHEN NEW.tran_dir = 'CR' THEN 1 ELSE -1 END) * NEW.tran_amt
                    WHERE   usr_id = NEW.usr_id AND pln_id = NEW.pln_id;

                    INSERT INTO userPlans (usr_id, pln_id, map_inv, map_roi, map_stat)
                    SELECT NEW.usr_id, NEW.pln_id, 0, NEW.tran_amt, 'AC'
                    WHERE NOT EXISTS ( SELECT 'X' FROM trans WHERE usr_id = NEW.usr_id AND pln_id = NEW.pln_id ) AND NEW.tran_dir = 'CR';
                END
                `,
            (err) => {
                if (err) { console.error(err); }
            }
        )

    }
});

module.exports = db;
