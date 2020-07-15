const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Feeds = mongoose.model('Feeds');

router.get('/', (req, res) => {
    res.render("feeds/addOrEdit", {
        viewTitle: "Insert Feeds"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var feeds = new Feeds();
    feeds.feed = req.body.feed;
    feeds.feed_url = req.body.feed_url
    feeds.save((err, doc) => {
        if (!err)
            res.redirect('feeds/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("feeds/addOrEdit", {
                    viewTitle: "Insert Feeds",
                    feeds: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Feeds.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('feeds/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("feeds/addOrEdit", {
                    viewTitle: 'Update Feeds',
                    feeds: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Feeds.find((err, docs) => {
        if (!err) {
            res.render("feeds/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving feeds list :' + err);
        }
    });
});




router.get('/:id', (req, res) => {
    Feeds.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("feeds/addOrEdit", {
                viewTitle: "Update Feeds",
                feeds: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Feeds.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/feeds/list');
        }
        else { console.log('Error in feeds delete :' + err); }
    });
});


// edit feed url
router.get('/feed_url/:id', (req, res) => {
    Feeds.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("feeds/addOrEdit", {
                viewTitle: "Update Feeds Url",
                feeds: doc
            });
        }
    });
});


router.get('/delete/feed_url/:id', (req, res) => {
    Feeds.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/feeds/list');
        }
        else { console.log('Error in feeds delete :' + err); }
    });
});

module.exports = router;