'use strict';

describe('Service: InstagramAuthentication', function () {

  // load the service's module
  beforeEach(module('unfollowApp'));

  // instantiate service
  var InstagramAuthentication;
  beforeEach(inject(function (_InstagramAuthentication_) {
    InstagramAuthentication = _InstagramAuthentication_;
  }));

  it('should do something', function () {
    expect(!!InstagramAuthentication).toBe(true);
  });

});
