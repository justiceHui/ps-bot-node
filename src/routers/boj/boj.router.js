const BOJ = require('./boj.controller');

const router = require('express').Router();
router.get(/\/user\/(.+)/, BOJ.getUser);
router.get(/\/random_problem\/(.+)/, BOJ.getRandomProblem);
router.get(/\/search_problem\/(.+)/, BOJ.searchProblem);
router.get(/\/tag\/(\d+)/, BOJ.getProblemTag);
router.get('/', (req, res) => {
    res.send('boj');
});
router.get(/\/problem_name\/(.+)/, BOJ.getProblemName);
module.exports = router;
