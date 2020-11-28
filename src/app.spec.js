const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const httpMocks = require('node-mocks-http');
const assert = require('assert');

const BOJ = require('./routers/boj/boj.controller');
const CF = require('./routers/codeforces/codeforces.controller');

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

describe('BOJ', function(){
    beforeEach(function(){
        req = httpMocks.createRequest();
        res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    });
    it('User: jhnah917(Normal User)', function(done){
        this.timeout(30000);
        res.on('end', function(){
            const str = res._getData();
            assert(str.includes('Solved'));
            assert(!str.includes('solved ac에 등록되지 않은 유저입니다.'));
            done();
        });
        req.params.handle = 'jhnah917';
        BOJ.getUser(req, res);
    });
    it('User: jhnah918(Not Exist)', function(done){
        this.timeout(30000);
        res.on('end', function(){
            const str = res._getData();
            assert(!str.includes('Solved'));
            assert(str.includes('solved ac에 등록되지 않은 유저입니다.'));
            done();
        });
        req.params.handle = 'jhnah918';
        BOJ.getUser(req, res);
    });
    it('Random Problem: Normal Query', function(done){
        this.timeout(30000);
        res.on('end', function(){
            const str = res._getData();
            assert(str.includes('http://icpc.me/'));
            assert(!str.includes('None'));
            done();
        });
        req.params.query = encodeURI('tier:d5..d1 tag:tag:segtree');
        BOJ.getRandomProblem(req, res);
    });
    it('Random Problem: Not Exist', function(done){
        this.timeout(30000);
        res.on('end', function(){
            const str = res._getData();
            assert(!str.includes('http://icpc.me/'));
            assert(str.includes('None'));
            done();
        });
        req.params.query = encodeURI('tier:b5 tag:tag:segtree');
        BOJ.getRandomProblem(req, res);
    });
    it('Search Problem: Normal Query', function(done){
        this.timeout(30000);
        const qry = 'tier:d5..d1 tag:tag:segtree';
        res.on('end', function(){
            const str = res._getData();
            assert(str.includes(qry));
            assert(str.includes('http://icpc.me/'));
            assert(!str.includes('None'));
            done();
        });
        req.params.query = encodeURI(qry);
        BOJ.searchProblem(req, res);
    });
    it('Search Problem: Not Exist', function(done){
        this.timeout(30000);
        const qry = 'tier:b5 tag:tag:segtree';
        res.on('end', function(){
            const str = res._getData();
            assert(str.includes(qry));
            assert(!str.includes('http://icpc.me/'));
            done();
        });
        req.params.query = encodeURI(qry);
        BOJ.searchProblem(req, res);
    });
    it('Problem Tag: 1000(Normal Query)', function(done){
        this.timeout(30000);
        res.on('end', function(){
            const str = res._getData();
            assert(str.includes('Impl'));
            assert(!str.includes('None'));
            done();
        })
        req.params.prob = 1000;
        BOJ.getProblemTag(req, res);
    });
    it('Problem Tag: 917(Not Exist)', function(done){
        this.timeout(30000);
        res.on('end', function(){
            const str = res._getData();
            assert(str === 'None');
            done();
        });
        req.params.prob = 917;
        BOJ.getProblemTag(req, res);
    });
});