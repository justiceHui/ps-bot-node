const BOJ = require('./boj.controller');

const router = require('express').Router();
router.get(/\/user\/(.+)/, BOJ.getUser);
router.get(/\/random_problem\/(.+)/, BOJ.getRandomProblem);
router.get(/\/search_problem\/(.+)/, BOJ.searchProblem);
router.get(/\/tag\/(.+)/, BOJ.getProblemTag);
router.get('/', (req, res) => {
    res.send('boj');
});
module.exports = router;

