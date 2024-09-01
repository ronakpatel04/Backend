const express = require('express');
const router = express.Router();
const Batch = require('../models/batch');

router.post('/', async (req, res) => {
    try {
        const batch = new Batch(req.body);
        await batch.save();
        res.status(201).send(batch);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const batches = await Batch.find().populate('productId'); 
        res.send(batches);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const batch = await Batch.findOne(req.params.id).populate('productId');
        if (!batch) {
            return res.status(404).send('Batch not found');
        }
        res.send(batch);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.put('/:id', async (req, res) => {
    try {
        const batch = await Batch.findByIdAndUpdate(req.params.id, req.body).populate('productId');
        if (!batch) {
            return res.status(404).send('Batch not found');
        }
        res.send(batch);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const batch = await Batch.findByIdAndDelete(req.params.id);
        if (!batch) {
            return res.status(404).send('Batch not found');
        }
        res.send(batch);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
