const express = require('express');
const router = express.Router();

const SesnService = require('../services/sesnService');
const UtilService = require('../services/utilService');

// Get all Sesns
router.get('/', (req, res) => {
    SesnService.getAllSesns((err, rows) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, rows, "Sesns Fetched Successfully");
    });
});

// Get Sesn by id
router.get('/:id', (req, res) => {
    SesnService.getSesnById(req.params.id, (err, row) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, row, "Sesn Fetched Successfully");
    });
});

// Create a new Sesn (POST)
router.post('/', (req, res) => {
    const data = req.body;
    SesnService.createSesn(data, (err, data) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, data, "Sesn Added Successfully");
    });
});


router.delete('/', (req, res) => {
    const data = req.body;
    SesnService.closeSesn(data, (err, data) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, data, "Sesn Closed Successfully");
    });
});

module.exports = router;
