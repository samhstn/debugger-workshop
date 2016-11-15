const shot = require('shot');
const tape = require('tape');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const fsStub = {
  // readFile: sinon.stub(),
};

// const handler = require('../src/handler.js');
const handler = proxyquire('../src/handler.js', { fs: fsStub });

tape('test get request to the / endpoint', t => {
  shot.inject(handler, { method: 'get', url: '/' }, (res) => {
    t.equal(res.statusCode, 200, '/ has status code of 200');
    t.ok(res.payload.includes('<!DOCTYPE'), 'finds index.html file');
    t.equal(res.headers['Content-type'], 'text/html', 'response type is html');
    t.end();
  });
});

tape('test get request returns 404 if index.html not found', t => {
  const stub = sinon.stub(fsStub, 'readFile');
  stub.yields(new Error());
  shot.inject(handler, { method: 'get', url: '/' }, (res) => {
    t.equal(res.statusCode, 404, '/ has status code of 404');
    t.end();
    stub.restore();
  });
});

tape('If requesting a file we\'re not handling throw 404', t => {
  shot.inject(handler, { method: 'get', url: '/jashdjashjd' }, (res) => {
    t.equal(res.statusCode, 404, '/jashdjashjd has status code of 404');
    t.end();
  });
});

tape('test to get to api endpoint', t => {
  shot.inject(handler, { method: 'get', url: '/api/words' }, (res) => {
    t.equal(res.statusCode, 200, '/api/words has status code of 200');
    t.end();
  });
});

tape('test that query string returns correct response', t => {
  shot.inject(handler, { method: 'get', url: '/api/words?match=ala&max=5' }, (res) => {
    const expect = 'ala\nAlabama\nAlabaman\nAlabamian\nalabamide\n';
    t.equal(res.payload, expect, 'returns correct response');
    t.end();
  });
});

tape('test what results will be returned when no parameters passed', t => {
  shot.inject(handler, { method: 'get', url: '/api/words' }, (res) => {
    const expect = 'A\na\naa\naal\naalii\naam\nAani\naardvark\naardwolf\nAaron\n';
    t.equal(res.payload, expect, 'returns correct response');
    t.end();
  });
});

tape('test get request to public endpoint', t => {
  shot.inject(handler, { method: 'get', url: '/public/script.js' }, (res) => {
    t.equal(res.statusCode, 200, '/public/script.js has status code of 200');
    t.end();
  });
});

tape('test script fails when given false public endpoint', t => {
  shot.inject(handler, { method: 'get', url: '/public/reregw' }, (res) => {
    t.equal(res.statusCode, 404, '/public/reregw has status code of 404');
    t.end();
  });
});
