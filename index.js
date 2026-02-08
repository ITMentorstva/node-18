
const express = require('express');
const app = express();

require('dotenv').config();

require('./src/controllers/homeController');
require('./src/controllers/userController');

express.Router();

app.use(express.json());

const userRouter = require('./src/routers/userRouter');
const homeRouter = require('./src/routers/homeRouter');


app.use('/user', userRouter);
app.use('/', homeRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Server running on http://localhost:3000");
});

