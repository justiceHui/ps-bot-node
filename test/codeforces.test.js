const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const httpMocks = require('node-mocks-http');
const assert = require('assert');

const CF = require('../src/routers/codeforces/codeforces.controller');

let req = httpMocks.createRequest();
let res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

describe('Codeforces', function(){
    beforeEach(function(){
        req = httpMocks.createRequest();
        res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    });
    it('Round: should send Upcoming Rounds', function(done){
        this.timeout(30000);
        res.on('end', function(){
            const str = res._getData();
            assert(str.split('\n')[0].includes('Upcoming Rounds'));
            done();
        });
        CF.getRound(req, res);
    });
    it('User: tourist(Normal User)', function(done){
        this.timeout(30000);
        res.on('end', function(){
            const str = res._getData();
            assert(str.includes('Rating'));
            assert(str.includes('Max Rating'));
            assert(!str.includes('라운드에 참가하지 않음'));
            assert(!str.includes('존재하지 않는 유저'));
            done();
        });
        req.params.handle = 'tourist';
        CF.getUser(req, res);
    });
    it('User: MikeMirzayanov(Never Participate Round)', function(done){
        this.timeout(30000);
        res.on('end', function(){
            const str = res._getData();
            assert(!str.includes('Rating'));
            assert(!str.includes('Max Rating'));
            assert(str.includes('라운드에 참가하지 않음'));
            assert(!str.includes('존재하지 않는 유저'));
            done();
        });
        req.params.handle = 'MikeMirzayanov';
        CF.getUser(req, res);
    });
    it('User: tourist917(Not Exist)', function(done){
        this.timeout(30000);
        res.on('end', function(){
            const str = res._getData();
            assert(!str.includes('Rating'));
            assert(!str.includes('Max Rating'));
            assert(!str.includes('라운드에 참가하지 않음'));
            assert(str.includes('존재하지 않는 유저'));
            done();
        });
        req.params.handle = 'tourist917';
        CF.getUser(req, res);
    });
});