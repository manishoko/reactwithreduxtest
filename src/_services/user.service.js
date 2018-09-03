import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    getAllSearch: _getAllSearch,
    delete: _delete,

};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
      //  headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/login.php?username=`+ username + `&password=` + password, requestOptions)
        .then(handleResponse)
        .then(user => {

            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
      //  method: 'GET',
        //dataType:"jsonp",
        //headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users.php`, requestOptions).then(handleResponse);
}

function getAllSearch(id) {
  const requestOptions = {
    //  method: 'GET',
      //dataType:"jsonp",
      //headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users.php`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {

    };

    return fetch(`${config.apiUrl}/user.php?userId=${id}`, requestOptions).then(handleResponse);
}
function _getAllSearch(id) {
    const requestOptions = {

    };

    return fetch(`${config.apiUrl}/userSearch.php?search=${id}`, requestOptions).then(handleResponse);
}


function register(user) {
    const requestOptions = {
        method: 'POST',
      //  headers: { 'Content-Type': 'application/json' },
      //  dataType:"jsonp",
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/register.php?userDetails=`+JSON.stringify(user), requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    
  };

  return fetch(`${config.apiUrl}/update.php?userDetails=`+JSON.stringify(user), requestOptions).then(handleResponse);

}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {

    };

    return fetch(`${config.apiUrl}/delete.php?deleteId=${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
