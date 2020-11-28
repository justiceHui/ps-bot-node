const request = require('request');
const BOJ = require('../../modules/boj');

module.exports = {
    getUser(req, res){
        const handle = req.params.handle;
        const url = 'https://api.solved.ac/user_information.php?id=' + handle;
        request.get({ url: url }, function(error, response, body){
            res.send(BOJ.getUser(handle, body));
        });
    },
    getRandomProblem(req, res){
        const query = req.params.query;
        const url = 'https://api.solved.ac/search/random_search.json?query=' + query;
        request.get({ url: url }, function(error, response, body){
            res.send(BOJ.randomProblem(query, body));
        });
    },
    searchProblem(req, res){
        const query = req.params.query;
        const url = 'https://api.solved.ac//search/search_recommendations.json?query=' + query;
        request.get({ url: url }, function(error, response, body){
            res.send(BOJ.searchProblem(query, body));
        });
    },
    getProblemTag(req, res){
        const prob = req.params.prob;
        const url = 'https://api.solved.ac/question_level_votes.php?id=' + prob;
        request.get({ url: url }, function(error, response, body){
            res.send(BOJ.getProblemTag(prob, body));
        });
    }
};