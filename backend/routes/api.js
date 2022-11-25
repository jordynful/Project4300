const express = require('express');

const router = express.Router();

const Module = require('../models/module');
const Vert = require('../models/vert')
const Pic = require('../models/pic')
// Routes for horizontal
router.get('/', (req, res) => {

    Module.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.post('/save', (req, res) => {
    const data = req.body;

    const newBlogPost = new Module(data);

    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});


// router.get('/name', (req, res) => {
//     const data =  {
//         username: 'peterson',
//         age: 5
//     };
//     res.json(data);
// });

router.put('/update:pid', (req, res) => {

    Module.find({id:req.pid})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
            data.title = req.title;
            data.description = req.description;
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.get('/vert', (req, res) => {

    Vert.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.post('/vert/save', (req, res) => {
    const data = req.body;

    const newBlogPost = new Vert(data);

    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});

router.get('/pic', (req, res) => {

    Pic.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.post('/pic/save', (req, res) => {
    const data = req.body;

    const newBlogPost = new Pic(data);

    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});
module.exports = router;
