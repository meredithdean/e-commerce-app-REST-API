const express = require('express');
const router = express.Router();
const { Category } = require('../models/category');


router.get('/', async (req, res) => {
    const categoryList = await Category.find()
    if(!categoryList) {
        res.status(500).json({success: false})
    }
    res.send(categoryList)
});

router.post('/', (req, res) => {
    const category = new Category({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    category.save().then((createdCategory) => {
        res.status(201).json(createdCategory)
    }).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })  
});

module.exports = router;