const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const httpMocks = require('node-mocks-http');
const assert = require('assert');

const BOJ = require('../src/routers/boj/boj.controller');

let req = httpMocks.createRequest();
let res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

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
            assert(str.includes('Tier'));
            assert(str.includes('Class'));
            assert(str.includes('Contribute'));
            assert(str.includes('solved.ac/profile'));
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
            assert(!str.includes('Tier'));
            assert(!str.includes('Class'));
            assert(!str.includes('Contribute'));
            assert(!str.includes('solved.ac/profile'));
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