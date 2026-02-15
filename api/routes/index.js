const UserRouter = require("./userRouter");
const PlanRouter = require("./planRouter");
const TranRouter = require("./tranRouter");
const SesnRouter = require("./sesnRouter");
const MailRouter = require("./mailRouter");

module.exports = {
    "UserRouter" : UserRouter, "PlanRouter" : PlanRouter, 
    "TranRouter" : TranRouter, "SesnRouter" : SesnRouter, 
    "MailRouter" : MailRouter
}