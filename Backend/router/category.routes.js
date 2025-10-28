const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const upload = require('../config/upload');
const router = express.Router();


router.post('/create',adminAuth, upload.array('images', 5),async (req, res) => {
    
});

router.put('/edit/:id',adminAuth, upload.array('images', 5), async (req, res) => {
    
});

router.delete('/delete/:id',adminAuth, async (req, res) => {
    
});

router.delete('/delete/name/:eng_name',adminAuth, async (req, res) => {
    
});

router.delete('/delete/name/:mar_name',adminAuth, async (req, res) => {
    
});

router.get('/find/:id', async (req, res) => {
    
});

router.get('/find/name/:mar_name', async (req, res) => {
    
});

router.get('/all', async (req, res) => {
    
});

router.get('/:id/products', async (req, res) => {
    
});

module.exports = router;
