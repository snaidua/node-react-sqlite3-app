const PlanModel = require('../models/planModel');

class PlanService {
    static getAllPlans(callback) {
        PlanModel.all(callback);
    }

    static getPlanById(id, callback) {
        PlanModel.getById(id, callback);
    }

    static createPlan(data, callback) {
        /*
        if (!user.usr_name || !user.usr_mobi || !user.usr_mail) {
            return callback(new Error(user));
        }
        */
        PlanModel.create(data, callback);
    }

    static updatePlan(id, data, callback) {
        // Add any validation or business logic here
        PlanModel.update(id, data, callback);
    }

    static deletePlan(id, callback) {
        PlanModel.delete(id, callback);
    }
}

module.exports = PlanService;
