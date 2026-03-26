const express = require('express');
const { upload, optimizeAndUpload } = require('../config/upload');
const adminAuth = require('../middleware/adminAuth');
const router = express.Router();
const productController = require('../controller/product.controller');

router.post('/',adminAuth, upload.array('images', 5),optimizeAndUpload, async (req, res) => {
  productController.createController(req,res);
});
router.get('/all', async (req, res) => {
  productController.getAllProductsController(req,res);
});


router.put('/:id',adminAuth,upload.array('images', 5),optimizeAndUpload, async (req, res) => {
    productController.editController(req,res);
});
// product.routes.js
router.delete('/bulk', adminAuth, async (req, res) => {
  productController.bulkDeleteController(req, res);
});
router.delete('/:id',adminAuth, async (req, res) => {
    productController.deleteController(req,res);
});

router.get('/:id', async (req, res) => {
    productController.getController(req,res);
});

router.get('/data/:id',adminAuth, async (req, res) => {
  productController.getDataController(req,res);
});

router.patch('/:id/visibility', adminAuth, async (req, res) => {
  productController.toggleVisibilityController(req, res);
});


router.get('/search/products', async (req, res) => {
  productController.searchProductsController(req, res);
});

router.get('/search/fuzzy', async (req, res) => {
  productController.fuzzySearchController(req, res);
});


module.exports = router;
