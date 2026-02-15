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
    UserService.createUser(data, (err, data) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, data, "User Added Successfully");
    });
});

// Update a user (PUT)
router.put('/:id', (req, res) => {
    const data = req.body;
    UserService.updateUser(req.params.id, data, (err, data) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, data, "User Update Successfully");
    });
});

// Delete a user (DELETE)
router.delete('/:id', (req, res) => {
    UserService.deleteUser(req.params.id, (err, data) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, data, "User Deleted Successfully");
    });
});

// Update a Account user (PUT)
router.put('/:id/account', (req, res) => {
    const data = req.body;
    UserService.updateAccount(req.params.id, data, (err, data) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, data, "User Update Successfully");
    });
});

// Get userplans by id
router.get('/:id/plans', (req, res) => {
    UserService.getPlans(req.params.id, (err, rows) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, rows, "User Plans Fetched Successfully");
    });
});

// Get userTrans by id
router.get('/:id/trans', (req, res) => {
    UserService.getTrans(req.params.id, (err, rows) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, rows, "User Trans Fetched Successfully");
    });
});

// Login (POST)
router.post('/login', (req, res) => {
    const data = req.body;
    UserService.loginByMail(data, (err, row) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
        }
        else {
            UtilService.toResult(res, row, "Login API Successfully");
        }
    });
});

// Verify (POST)
router.post('/verify', (req, res) => {
    const data = req.body;
    UserService.verifyByPin(data, (err, row) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
        }
        else {
            UtilService.toResult(res, row, "PIN verified Successfully");
        }
    });
});


module.exports = router;
