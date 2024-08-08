const express = require('express');
const router = express.Router();
const presentationController = require('../controllers/presentationController');


router.route('/')
    .post(presentationController.createPresentation)  
    .get(presentationController.getAllPresentations); 

router.route('/:title')
    .get(presentationController.getPresentationByTitle)  
    .delete(presentationController.deletePresentationByTitle); 

// Routes for handling Slides within a Presentation
router.route('/:title/slides')
    .post(presentationController.addSlideToPresentation); 

router.route('/:title/slides/:slideId')
    .patch(presentationController.alterSlideInPresentation)  
    .delete(presentationController.deleteSlideFromPresentation); 

// Route for updating the Authors list in a Presentation
router.route('/:title/authors')
    .patch(presentationController.updateAuthorsList); 

module.exports = router;
