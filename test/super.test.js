const request = require('supertest')
const expect = require('chai').expect
require('mocha-simple-snapshots')
const staticCling = require('../lib/handler')

describe('The server handler', function() {
  it('responds with html', function(done) {
    const app = staticCling({
      port: 4001,
      root: './test/other/',
      filename: 'test.html',
    })
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err
        expect(res.text).to.matchSnapshot()
        done()
      })
  })
  it('responds with 404', function(done) {
    const app = staticCling({
      port: 4001,
      root: './test/other/',
      filename: 'test.html',
    })
    request(app)
      .get('/glarg')
      .expect('Content-Type', /html/)
      .expect(404, done)
  })
  it('responds with the correct file', function(done) {
    const app = staticCling({
      port: 4001,
      root: './test/other/',
      filename: 'test.html',
    })
    request(app)
      .get('/file.html')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err
        expect(res.text).to.matchSnapshot()
        done()
      })
  })
  it('responds with the correct file when base called', function(done) {
    const app = staticCling({
      root: './test/other/',
      filename: 'test.html',
    })
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err
        expect(res.text).to.matchSnapshot()
        done()
      })
  })
})
