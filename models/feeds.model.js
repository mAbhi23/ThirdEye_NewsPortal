const mongoose = require('mongoose');
const express = require('express');

var router = express.Router();

var feedsSchema = new mongoose.Schema({
    feed: {
        type: String,
        required: 'This field is required.'
    },
    feed_url: {
      type : String
    }
});



var feedarray = mongoose.model('Feeds', feedsSchema);

router.get('/', (req, res) => {
    feedarray.find()
      .then(results => {
        res.render('index.ejs', { feeds: results })
      })
      .catch(/* ... */)
  })


  module.exports = router;

