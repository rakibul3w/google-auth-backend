const express = require('express')
const cors = require('cors');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes')


const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());

// connect with database
connectDB();

app.use("/user", userRoutes);


// base API
app.get('/', (req, res) => {
    res.send('Hello World...!')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})