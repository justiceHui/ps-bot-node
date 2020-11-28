const router = require('express').Router();

// add Router
const boj = require('./boj/boj.router');
const codeforces = require('./codeforces/codeforces.router');

router.use('/boj', boj);
router.use('/codeforces', codeforces);

module.exports = router;