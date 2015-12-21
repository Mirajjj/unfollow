'use strict';
import AuthenticatedUser from './authenticated_user.model';


exports.saveUser = function (id, access_token, data) {
  AuthenticatedUser.find({id: id}).limit(1).then(function (response) {
    var existsAuthenticatedUser = false ;
      
    response.map(function (user) { existsAuthenticatedUser = true});

    if (existsAuthenticatedUser) {
      AuthenticatedUser.update(
        {
          id: id
        }, 
        {
          access_token: access_token,
          data: JSON.stringify(data)
        }
      );
    } else {
      AuthenticatedUser.createAsync({
        id: id,
        access_token: access_token,
        data: JSON.stringify(data)
      });
    }
  })
};


exports.getUser = function (id, callback) {
  AuthenticatedUser.find({id: id}).limit(1).then(function (response) {
    var existsAuthenticatedUser = false,
        user = null;
    console.log(response);  
    response.map(function (user) { existsAuthenticatedUser = true});

    if (existsAuthenticatedUser) {
      user = response[0];
    }

    callback(user);
  });
}