const { Router } = require('express');
const searchController = require('../controllers/searchController');

const router = Router();

router.get('/:query', searchController.find_handyman_get);

module.exports = router;