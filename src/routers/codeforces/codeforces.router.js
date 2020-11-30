const Codeforces = require('./codeforces.controller');

const router = require('express').Router();
router.get('/round', Codeforces.getRound);
router.get(/\/user\/(.+)/, Codeforces.getUser);
router.get('/', (req, res) => {
    res.send('codeforces');
});
module.exports = router;