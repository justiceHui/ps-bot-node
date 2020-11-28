const BOJ = require('./boj.controller');

const router = require('express').Router()
router.get('/user/:handle', BOJ.getUser);
router.get('/random_problem/:query', BOJ.getRandomProblem);
router.get('/search_problem/:query', BOJ.searchProblem);
router.get('/tag/:prob', BOJ.getProblemTag);
router.get('/', (req, res) => {
    res.send('boj');
});
module.exports = router;