const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database'); // Initialize database connection

const app = express();
app.use(bodyParser.json());

// Use routes
const routes = require('./routes');
app.use('/api/users', routes.UserRouter);
app.use('/api/plans', routes.PlanRouter);
app.use('/api/trans', routes.TranRouter);
app.use('/api/mails', routes.MailRouter);

// Default route
app.get('/', (req, res) => {
    res.json({"message": "API is running"});
});

const Config = require("./config");
const PORT = Config.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
