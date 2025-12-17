const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/tripsController');

router.get('/', tripsController.getAll);
router.get('/add', tripsController.getAddForm);
router.post('/add', tripsController.postAdd);

router.get('/edit/:id', tripsController.getEditForm);
router.post('/edit/:id', tripsController.postEdit);
router.post('/delete/:id', tripsController.deleteTrip);
router.get('/details/:id', tripsController.getDetails);
router.get('/about', tripsController.getAbout);

module.exports = router;