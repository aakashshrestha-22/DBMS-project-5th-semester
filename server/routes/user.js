const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.get('/homepage',userController.butt)
router.get('/aboutcollege',userController.college)
router.get('/certificate',userController.certf)

router.get('/',userController.view)
router.post('/',userController.find)
router.get('/addUser',userController.form)
router.post('/addUser',userController.create)
router.get('/editUser/:id',userController.edit)
router.post('/editUser/:id',userController.update)
router.get('/:id',userController.delete)
router.get('/viewuser/:id',userController.viewAll)

module.exports= router;