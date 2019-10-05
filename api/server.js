const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');   
const mongoose  = require('mongoose');
const config = require('./DB');
//const businessRoute = require('./route/businessRoute')
const passport = require('passport');

// Routes to be used
const usersRoute = require('./route/usersRoute');
const adminRoute = require('./route/adminRoute');
const stationRoute = require('./route/stationRoute');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || config.DB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(
    () => {console.log('Database is connected')},
    err => {console.log('Can not connect to database ' + err)}
);

app.use(cors());
// To parse application/x-www-form-urlencoded set to false
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport') (passport);
app.use('/station', stationRoute);
app.use('/user', usersRoute);
app.use('/admin', adminRoute); 

app.listen(PORT, function(){
    console.log(`Server is running on Port: ${PORT}`);
});     