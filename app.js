const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json()); 
app.use(cors());

const productRoutes = require('./routes/product');
const batchRoutes = require('./routes/batches');
const codeRoutes = require('./routes/code'); 

app.use('/api/products', productRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/codes', codeRoutes);

mongoose.connect('mongodb://localhost:27017/local', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
