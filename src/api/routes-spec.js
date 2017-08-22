'use strict';
var expect = require('must');
describe('Server unit tests', function() {
    it('Should return green', function(done) {
        expect('foo').to.eql('foo');
        done();
    });
});