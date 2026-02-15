const PlanModel = require('../models/planModel');

class PlanService {
    static getAllPlans(callback) {
        PlanModel.all(callback);
    }

    static getPlanById(id, callback) {
        PlanModel.getById(id, callback);
    }

    static createPlan(data, callback) {
        PlanModel.create(data, callback);
    }

    static updatePlan(id, data, callback) {
        PlanModel.update(id, data, callback);
    }

    static deletePlan(id, callback) {
        PlanModel.delete(id, callback);
    }
}

module.exports = PlanService;
