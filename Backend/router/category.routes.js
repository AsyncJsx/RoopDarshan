const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const categoryController = require('../controller/category.controller');
const router = express.Router();


router.post('/create',adminAuth, async (req, res) => {
    categoryController.createController(req,res);
});

router.put('/:id',adminAuth,  async (req, res) => {
    categoryController.editController(req,res);
});

router.delete('/:id',adminAuth, async (req, res) => {
    categoryController.deleteController(req,res);
});

router.get('/all', async (req, res) => {
    categoryController.getAllController(req,res);
});

router.get('/:id', async (req, res) => {
    categoryController.findController(req,res);
});

router.get('/:id/products', async (req, res) => {
    categoryController.getProductsController(req,res);
});

module.exports = router;
