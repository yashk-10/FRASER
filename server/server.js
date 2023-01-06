const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 6001;

mongoose.set('strictQuery', false);
mongoose.connect(process.env.ATLAS_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Connected!")
})

app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});