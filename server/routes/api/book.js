const express = require('express');
const router = express.Router();
const Book = require('../../models/book');

// @route   Get api/book/:id
// @desc    Get a book by Id
// @access  Public/Private
router.get('/:id', (req, res) => {
  let id = req.params.id;

  Book.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });
});

// @route   Get api/book/all
// @desc    Get a book by Id
// @access  Public/Private
router.get('/all', (req, res) => {
  // locahost:3001/api/book/all?skip=3&limit=2&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  // ORDER = asc || desc
  Book.find()
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
});

// @route   POST api/book
// @desc    POST a book
// @access  Public/Private
router.post('/', (req, res) => {
  const book = new Book(req.body);

  book.save((err, doc) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({
      post: true,
      bookId: doc._id,
    });
  });
});

// @route   UPDATE api/book/update
// @desc    UPDATE a book
// @access  Public/Private
router.post('/update', (req, res) => {
  Book.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    // { useFindAndModify: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      res.json({
        success: true,
        doc,
      });
    }
  );
});

// @route   DELETE api/book/:id
// @desc    DELETE a book
// @access  Public/Private
router.delete('/:id', (req, res) => {
  let id = req.params.id;

  Book.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json(true);
  });
});

module.exports = router;