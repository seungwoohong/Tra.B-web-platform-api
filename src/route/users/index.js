const express = require('express');
const router = express.Router();
const ctrl = require('./user.controller');
 
// Route Setting
router.get('/', ctrl.users);
router.get('/:id/:password/', ctrl.select);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.destory);

module.exports = router;
