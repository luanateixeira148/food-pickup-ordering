const express = require('express');
const router = express.Router();


// GET /admin
router.get ('/', (req, res) => {
  res.render('admin');
});

module.exports = router;