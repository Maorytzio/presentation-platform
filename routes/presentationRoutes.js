const express =  require('express')
const router =  express.Router()
const presentationController = require('../controllers/presentationController')


router.route('/')
.post(presentationController.createPresentation)
   


module.exports = router