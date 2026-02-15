const express = require('express');
const router = express.Router();

const TranService = require('../services/tranService');
const UtilService = require('../services/utilService');

// Get all Trans
router.get('/', (req, res) => {
    TranService.getAllTrans((err, rows) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, rows, "Trans Fetched Successfully");
    });
});

// Get Tran by id
router.get('/:id', (req, res) => {
    TranService.getTranById(req.params.id, (err, row) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, row, "Tran Fetched Successfully");
    });
});

// Create a new Tran (POST)
router.post('/', (req, res) => {
    const data = req.body;
    TranService.createTran(data, (err, data) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, data, "Tran Added Successfully");
    });
});

// Delete a Tran (DELETE)
router.delete('/:id', (req, res) => {
    TranService.deleteTran(req.params.id, (err, data) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, data, "Tran Deleted Successfully");
    });
});

router.post('/invest', (req, res) => {
    const data = req.body;
    TranService.InvestCapital(data, (err, data) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, data, "Capital Invested Successfully");
    });
});

router.post('/withdraw', (req, res) => {
    const data = req.body;
    TranService.WithdrawCapital(data, (err, data) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, data, "Capital Withdrawn Successfully");
    });
});

router.post('/profit', (req, res) => {
    const data = req.body;
    TranService.creditProfit(data, (err, data) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, data, "Profit Credited Successfully");
    });
});


module.exports = router;
