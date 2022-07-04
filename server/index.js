const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRouter = require('./Routers/User_route');
const path = require('path');

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));


// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log('MongoDB Connected') }).catch(err => { console.log(err) })

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use('/api/user', userRouter);


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})


// listen to a port
app.listen(process.env.PORT, () => { console.log('Server is running on port ' + process.env.PORT) });