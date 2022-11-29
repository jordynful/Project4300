// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const Module = require('./models/module');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 8000; // Step 1

const routes = require('./routes/api');
const adminRoutes = require('./routes/auth-routes');

// Step 2
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://user123:testing123@cluster0.vhbtg4n.mongodb.net/final', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

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
app.use('/auth-routes', adminRoutes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));

const data = {
    email: 'annieneal05@gmail.com',
    password: 'test1234',
    username: 'annie'
}

//newUser = new User(data)
//newUser.save();

