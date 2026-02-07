const express = require('express');
const router = express.Router();

const UserService = require('../services/userService');

// Get all users
router.get('/', (req, res) => {
    UserService.getAllUsers((err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Get user by id
router.get('/:id', (req, res) => {
    UserService.getUserById(req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
});

// Create a new user (POST)
router.post('/', (req, res) => {
    const { name, email } = req.body;
    UserService.createUser({ name, email }, (err, lastID) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.status(201).json({
            "message": "success",
            "data": { id: lastID, name, email }
        });
    });
});

// Update a user (PUT)
router.put('/:id', (req, res) => {
    const { name, email } = req.body;
    UserService.updateUser(req.params.id, { name, email }, (err, changes) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "changes": changes
        });
    });
});

// Delete a user (DELETE)
router.delete('/:id', (req, res) => {
    UserService.deleteUser(req.params.id, (err, changes) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "deleted",
            "changes": changes
        });
    });
});

module.exports = router;
