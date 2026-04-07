const express = require ('express');
const studentcontroller = require('../controllers/studentController');
const router = express.Router();
router.post ('/students',studentcontroller.createStudent);
router.get('/students', studentcontroller.getAllStudents);
router.get('/students/:id', studentcontroller.getStudentbyId);
router.put('/students/:id', studentcontroller.updateStudent);
router.delete('/students/:id', studentcontroller.deleteStudent) 
module.exports = router;