const express = require('express');
const router = express.Router();

const PlanService = require('../services/planService');
const UtilService = require('../services/utilService');

// Get all Plans
router.get('/', (req, res) => {
    PlanService.getAllPlans((err, rows) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, rows, "Plans Fetched Successfully");
    });
});

// Get Plan by id
router.get('/:id', (req, res) => {
    PlanService.getPlanById(req.params.id, (err, row) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, row, "Plan Fetched Successfully");
    });
});

// Create a new Plan (POST)
router.post('/', (req, res) => {
    const data = req.body;
    PlanService.createPlan(data, (err, data) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, data, "Plan Added Successfully");
    });
});

// Update a Plan (PUT)
router.put('/:id', (req, res) => {
    const data = req.body;
    PlanService.updatePlan(req.params.id, data, (err, data) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, data, "Plan Updated Successfully");
    });
});

// Delete a Plan (DELETE)
router.delete('/:id', (req, res) => {
    PlanService.deletePlan(req.params.id, (err, data) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, data, "Plan Deleted Successfully");
    });
});

module.exports = router;
