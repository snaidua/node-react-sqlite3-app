const express = require('express');
const router = express.Router();

const MailService = require('../services/mailService');
const UtilService = require('../services/utilService');

router.post('/send', (req, res) => {
    const data = req.body;

    MailService.send(data, (err, info) => {
        if (err) {
            UtilService.toResult(res, null, err.message);
            return;
        }
        UtilService.toResult(res, info, "Mail Sent Successfully");
    });
   
});

module.exports = router;