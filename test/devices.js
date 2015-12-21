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
        should.not.exist(err);
        var collection = body.res.pop();
        collection.should.be.type('array');
        collection.should.have.property('description');
        collection.should.have.property('type');
      });
      done();
  });


  it('you get a 404 for unknown device', function(done) {
    request(server)
      .get('/devices/1337')
      .expect(404);
      done();
  });

  it('returns info about a specific device', function(done) {
    request(server)
      .get('/devices/0')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        var dev = body.res.pop();
        dev.should.have.property('id');
        dev.should.have.property('description');
        dev.should.have.property('status');
      });
      done();
  });

  it('updates a specific device', function(done) {
    request(server)
      .post('/devices/2/1')
      .expect(204);

    request(server)
      .get('/devices/2')
      .expect(200)
      .end(function(err, res) {
        var dev = body.res.pop();
        dev.should.have.property('status').with.value(1);
      });
    done();
  });

});
