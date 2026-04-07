const express = require ('express');
const attendantcontroller = require('../controllers/attendantController');
const router = express.Router();
router.post ('/attendants',attendantcontroller.createAttendant);
router.get('/attendants', attendantcontroller.getAllAttendants);
router.get('/attendants/:id', attendantcontroller.getAttendantbyId);
module.exports = router;