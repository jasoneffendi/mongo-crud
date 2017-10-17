var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
, assert = require('assert');

var url = 'mongodb://localhost:27017/library';

MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  db = database
})

/* GET home page. */
router.get('/', function(req, res, next) {
  db.collection('books').find().toArray(function(err,results) {
    console.log(results)
    res.send(results)
  })
});


router.post('/books', (req,res) => {
  // res.send(req.body)
  db.collection('books').save({
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    stock: req.body.stock
  }, (err, result) => {
    if(err) return console.log(err)

    console.log('saved to database')
    res.send('save berhasil')
  })
})


router.put('/books/:id', (req,res) => {
  db.collection('books').findOneAndUpdate({
    isbn: req.params.id
  }, {
    $set: {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    }
  }, (err, result) => {
    if(err) return res.send(err)
    res.send(result)
  })
})

router.delete('/books/:isbn', (req,res) => {
  // res.send(req.body)
  db.collection('books').findOneAndDelete({
    isbn: req.params.isbn
    // "_id": `${req.params.isbn}`
  }, (err, result) => {
    if(err) return res.send(err)
    res.send({message: 'a book has been deleted', book: result})
  })
})


module.exports = router;
