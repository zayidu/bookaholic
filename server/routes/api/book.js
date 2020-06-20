const express = require('express');
const router = express.Router();
const Book = require('../../models/book');
const { check, validationResult } = require('express-validator');

// @route   Get /api/book/:id = Eg: /api/book/5eead67b15a2cd314fa572a1
// @desc    Get a book by Id
// @access  Public/Private
router.get('/:id', (req, res) => {
  let id = req.params.id;

  Book.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });
});

// @route   Get /api/books
// @desc    Get Books
// @access  Public/Private
router.get('/', (req, res) => {
  // locahost:3001/api/books?skip=0&limit=5&order=asc
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

// @route   POST /api/book
// @desc    POST a book
// @access  Public/Private
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('author', 'Author is required').not().isEmpty(),
    check('review', 'Review is required').not().isEmpty(),
    check('rating', 'Rating is required').not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return (
        res
          // .status(400)
          .json({ post: false, message: errors.array()[0].msg })
      );
    }

    const book = new Book(req.body);

    book.save((err, doc) => {
      if (err) return res.status(400).send(err);

      res.status(200).json({
        post: true,
        bookId: doc._id,
      });
    });
  }
);

// @route   POST /api/book/update
// @desc    UPDATE a book
// @access  Public/Private
router.post(
  '/update',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('author', 'Author is required').not().isEmpty(),
    check('review', 'Review is required').not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, erros: errors.array() });
    }
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
  }
);

// @route   DELETE /api/book/:id
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
