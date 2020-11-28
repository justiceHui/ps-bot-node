const request = require('request');
const CF = require('../../modules/codeforces');

module.exports = {
    getRound(req, res){
        const url = 'https://codeforces.com/api/contest.list?gym=false';
        request.get({ url: url }, function(error, response, body){
            res.send(CF.getRound(body));
        });
    },
    getUser(req, res){
        const handle = req.params.handle;
        const url = 'https://codeforces.com/api/user.info?handles=' + handle;
        request.get({ url: url }, function(error, response, body){
            res.send(CF.getUser(handle, body));
        });
    }
};