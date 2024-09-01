const express = require('express');
const router = express.Router();
const Code = require('../models/code');

const generateUniqueCode = async () => {
    let code;
    let isUnique = false;
    while (!isUnique) {
        code = Math.floor(1000 + Math.random() * 9000).toString();
        const existingCode = await Code.findOne({ code });
        if (!existingCode) {
            isUnique = true;
        }
    }

    return code;
};

router.post('/', async (req, res) => {
    const { productId, batchId } = req.body;

    if (!productId || !batchId) {
        return res.status(400).send('Product ID and Batch ID are required.');
    }

    try {
        const uniqueCode = await generateUniqueCode();
        
        const newCode = new Code({
            productId,
            batchId,
            code: uniqueCode
        });

        await newCode.save();        
        res.status(201).json(newCode);
    } catch (error) {
        console.error('Error generating code:', error);
        res.status(500).send('Server error');
    }
});

router.get('/', async(req,res)=>{
try{
    const codes = await Code.find().populate('productId', 'name') 
    .populate('batchId', 'name');;
    res.json(codes);

} catch(error){
    res.status(500).json({message:error.message});
}
})

router.put('/:id', async (req, res) => {
    const { id } = req.params.id;
    const { productId, batchId } = req.body;

    try {
        const updatedCode = await Code.findByIdAndUpdate(
            id,
            { productId, batchId },
            { new: true } 
        );

        if (!updatedCode) {
            return res.status(404).send('Code not found.');
    }
        res.json(updatedCode);
    } catch (error) {
        console.error('Error updating code:', error);
        res.status(500).send('Server error');
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params.id;
    try {
        const deletedCode = await Code.findByIdAndDelete(id);
        if (!deletedCode) {
            return res.status(404).send('Code not found.');
        }
        res.json({ message: 'Code deleted successfully.' });
    } catch (error) {
        console.error('Error deleting code:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
