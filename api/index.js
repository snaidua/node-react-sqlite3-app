const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database'); // Initialize database connection
const userRoutes = require('./routes/userRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use user routes for /api/users endpoint
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
    res.json({"message": "API is running"});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
