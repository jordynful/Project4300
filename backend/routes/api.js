const express = require('express');

const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const Module = require('../models/module');
const Vert = require('../models/vert')
const Pic = require('../models/pic');

const db = 'mongodb+srv://user123:testing123@cluster0.vhbtg4n.mongodb.net/final';
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


//delete functions
router.delete('/horizontal/:id', (req, res) => {

    Module.deleteOne({_id : ObjectId(req.params.id)})
    .then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', daerrorta);
    });

  });

  router.delete('/vert/:id', (req, res) => {

    Vert.deleteOne({_id : ObjectId(req.params.id)})
    .then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', daerrorta);
    });

  });

  router.delete('/pic/:id', (req, res) => {

    Pic.deleteOne({_id : ObjectId(req.params.id)})
    .then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', daerrorta);
    });

  });

  //update API's
  router.put('/horizontal/put/:id', (req, res) => {
    const filter = { _id : ObjectId(req.params.id)};
    const update = { $set :{
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        facts: req.body.facts 
    }};
    Module.updateOne(filter, update)
    .then((data) => {
        console.log('Data: ', data);
        // console.log(req.params);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', daerrorta);
    });

  });

  router.put('/pic/put/:id', (req, res) => {

    const filter = { _id : ObjectId(req.params.id)};
    const update = { $set :{
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        facts: req.body.facts 
    }};
    Pic.updateOne(filter, update)
    .then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', daerrorta);
    });

  });

  router.put('/vert/put/:id', (req, res) => {

    const filter = { _id : ObjectId(req.params.id)};
    const update = { $set :{
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        facts: req.body.facts 
    }};
    Vert.updateOne(filter, update)
    .then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', daerrorta);
    });

  });
module.exports = router;