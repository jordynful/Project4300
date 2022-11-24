// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const Module = require('./models/module');

const app = express();
const PORT = process.env.PORT || 8000; // Step 1

const routes = require('./routes/api');

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




app.listen(PORT, console.log(`Server is starting at ${PORT}`));


const data = {
  id: '21',
  title: "Muffins",
  description: "Muffins and such",
  imageUrl: "https://cdn11.bigcommerce.com/s-pll9il/images/stencil/1280x1280/products/88/262/2R9A1868__70833.1592021428.jpg?c=2",
  facts: "Total Fat: 8g, Saturated Fat: 1g, Trans Fat: 0g, Cholesterol: 0mg,Sodium: 160g, Total Carbohydrate: 37g, Dietary Fiber: 4g, Total Sugars: 12g, Protein: 3g, Vitamin D: 2mcg, Calcium: 260mg, Iron: 8mg, Potassium: 240mg"
}

newModule = new Module(data);
newModule.save();