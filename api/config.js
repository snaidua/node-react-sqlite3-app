require('dotenv').config();

const Config = {
    PORT: process.env.PORT,
    MAIL: {
        "SERVER_NAME"   : process.env.SERVER_NAME   ,
        "SERVER_PORT"   : process.env.SERVER_PORT   ,
        "SERVER_SSL"    : process.env.SERVER_SSL    ,
        "USER_ID"       : process.env.USER_ID       ,
        "USER_MAIL"     : process.env.USER_MAIL     ,
        "USER_PASS"     : process.env.USER_PASS
    }
}

module.exports = Config;