const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const userModel = require('./users').users;
const postModel = require('./users').posts;

// Home Route
router.get('/home', (req, res) => {
    if (req.session.isValid === 1) {
        res.render('Home', { title: "Home", username: req.session.username, images: null });
    } else {
        res.redirect('/');
    }
});

router.post('/home', async (req, res) => {
    const searched = req.body.search;

    const searchResults = await postModel.find({ caption: { $regex: searched, $options: 'i' } });
    
    const filenames = searchResults.map(result => result.filename);
    const captions = searchResults.map(result2 => result2.caption);


    res.render('resultImages', { title: "home", username: req.session.username, images: filenames, caption : captions  });
});

// Upload Route
router.get('/upload', (req, res) => {
    if (req.session.isValid === 1) {
        res.render('upload', { title: "Upload a post", username: req.session.username });
    } else {
        res.redirect('/');
    }
});

router.post('/upload',

multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const filename = 'Arterest-' + Date.now() + path.extname(file.originalname);
        cb(null, filename);
        req.flash('filename', filename);
    }
})}).single('myImage'),

async (req, res) => {
    const user = await userModel.findOne({ username: req.session.username });

    try{
        await postModel.create({
        u_id: user._id,
        filename: req.flash('filename')[0],
        caption: req.body.caption,
        username: user.username
    });


    res.render('partials/success', { title: "Successful", msg: "Post is uploaded successfully", location: "profile" });
}
catch(error){
    res.render('partials/error', { title: "Error", error: error });

}
});

router.get('/delete-image', async (req, res) => {
    try {
        const imageName = req.query.imageName;
        if (!imageName) {
            return res.render('partials/error', { title: "Error", error: "ImageName is required." });
        }

        const deletionResult = await postModel.deleteOne({ filename: imageName });

        if (deletionResult.deletedCount === 0) {
            
            return res.render('partials/error', { title: "Error", error: "Image not found for deletion." });
        }
        
        res.render('partials/success', { title: "Successful", msg: "Post is deleted successfully", location: "profile" });
    } catch (error) {
        // console.error("Error deleting image:", error);
        res.render('partials/error', { title: "Error", error: "An error occurred while deleting the image." });
    }
});


// Profile Route
router.get('/profile', async (req, res) => {
    if (req.session.isValid === 1) {
        const user = await userModel.findOne({ username: req.session.username });
        const uploadedImgs = await postModel.find({ username: req.session.username }, 'filename').lean();
        const filenames = uploadedImgs.map(result => result.filename);
      
        res.render('profile', { title: "Profile", username: user.username, name: user.name, email: user.email, images:filenames });
    } else {
        res.redirect('/');
    }
});


module.exports = router;
