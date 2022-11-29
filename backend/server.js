// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const Module = require('./models/module');
const User = require('./models/user');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000; // Step 1

const routes = require('./routes/api');
// const authroutes = require('./routes/auth.routes');
// const userroutes = require('./routes/user.routes');

// Step 2
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://user123:testing123@cluster0.vhbtg4n.mongodb.net/final', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
   
    console.log('Mongoose is connected!!!!');
});

app.use(bodyParser.urlencoded({extended: false}));

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Step 3

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);
// app.use('/auth', authroutes);
// app.use('/user', userroutes);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);




app.listen(PORT, console.log(`Server is starting at ${PORT}`));
