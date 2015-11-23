var request = require('supertest');
var should = require('should');
var server = require('../app');

describe('web back end', function() {

  it('responds to /', function(done) {
    request(server)
      .get('/')
      .expect(200, done);

  });

  it('you get a 404 for unknown endpoints', function(done) {
    request(server)
      .get('/foo')
      .expect(404);
    request(server)
      .post('/bar')
      .expect(404, done);
  });

  it('returns a list of devices', function(done) {
    request(server)
      .get('/devices')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        var collection = body.res.pop();
        collection.should.be.type('array');
        collection.should.have.property('description');
      });
      done();
  });

  it('you get a 404 for unknown device', function(done) {
    request(server)
      .get('/devices/1337')
      .expect(404, done);
  });
});
