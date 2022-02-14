const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');
const mongoose = require('mongoose');
require('dotenv').config();

const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/users');
const fileRouter = require('./routes/files');
const app = express();

const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());
app.use(fileUpload({
    createParentPath: true
}));

app.use(morgan('dev'));

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log("MongoDB database connection established successfully"));

app.use('/exercises', exercisesRouter);
app.use('/users', userRouter);
app.use('/files', fileRouter);


//start app 
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

