const userService = require("./userService");
const planService = require("./planService");
const tranService = require("./tranService");
const mailService = require("./mailService");
const utilService = require("./utilService");

module.exports = {
    "userService" : userService, 
    "planService" : planService, 
    "tranService" : tranService,
    "mailService" : mailService,
    "utilService" : utilService
}