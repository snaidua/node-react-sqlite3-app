const express = require('express');
const router = express.Router();

const UserService = require('../services/userService');
const UtilService = require('../services/utilService');

// Get all users
router.get('/', (req, res) => {
    UserService.getAllUsers((err, rows) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, rows, "Users Fetched Successfully");
    });
});

// Get user by id
router.get('/:id', (req, res) => {
    UserService.getUserById(req.params.id, (err, row) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, row, "User Fetched Successfully");
    });
});

// Create a new user (POST)
router.post('/', (req, res) => {
    const data = req.body;
    UserService.createUser(data, (err, lastID) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, lastID, "User Added Successfully");
    });
});

// Update a user (PUT)
router.put('/:id', (req, res) => {
    const data = req.body;
    UserService.updateUser(req.params.id, data, (err, changes) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, changes, "User Update Successfully");
    });
});

// Delete a user (DELETE)
router.delete('/:id', (req, res) => {
    UserService.deleteUser(req.params.id, (err, changes) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, changes, "User Deleted Successfully");
    });
});

// Update a Account user (PUT)
router.put('/:id/account', (req, res) => {
    const data = req.body;
    UserService.updateAccount(req.params.id, data, (err, changes) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, changes, "User Update Successfully");
    });
});

// Get userplans by id
router.get('/:id/plans', (req, res) => {
    UserService.getPlans(req.params.id, (err, row) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, row, "User Plans Fetched Successfully");
    });
});

// Get userTrans by id
router.get('/:id/trans', (req, res) => {
    UserService.getTrans(req.params.id, (err, row) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, row, "User Trans Fetched Successfully");
    });
});

module.exports = router;
