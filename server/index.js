
require('dotenv').config();


const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const PORT = 3001;
const app = express();
const loginRouter = require('./routes/loginRouter.js');
const registerRouter = require( './routes/registerRouter.js');

// DB
const connectDB = require("./config/conn.js");
connectDB();


// middleware & statics
app.use(express.static('public'))
app.use(express.json());
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());


// routes

app.use('/user', registerRouter);
app.use('/user',loginRouter );


//404 route
app.use((req, res) => {
    res.status(404).send("Sorry can't find that!")
})

app.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`);
    }
);
