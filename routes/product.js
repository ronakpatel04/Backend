const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const product = require('../models/product');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const {  name, composition } = req.body;

  const product = new Product({
    name,
    composition
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params; 
  const updateData = req.body; 
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct); 
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); 
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params; 

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' }); 
  }
});
module.exports = router;
