const userService = require("./userService");
const planService = require("./planService");
const tranService = require("./tranService");
const sesnService = require("./sesnService");
const mailService = require("./mailService");
const utilService = require("./utilService");

module.exports = {
    "userService" : userService, "planService" : planService, 
    "tranService" : tranService, "sesnService" : sesnService,
    "mailService" : mailService,
    "utilService" : utilService
}