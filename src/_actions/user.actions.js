import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    updateSingle,
    getSearchAll: _getSearchAll,
    getsingle: getsingle,

    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                  if(user.status==1){
                    if(user.role==2){
                      history.push('/helloWorld');
                    }
                    else{
                      history.push('/');
                    }
                  }else{
                    dispatch(alertActions.error("User Details are not match. !"));
                  }

                },
                error => {
                      dispatch(failure(error.toString()));
                      dispatch(alertActions.error(error.toString()));


                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
function updateSingle(user) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user)
            .then(
                user => {
                    dispatch(success());
                  //  history.push('/');
                    dispatch(alertActions.success('Update successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.UPDTE_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDTE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDTE_FAILURE, error } }
}



function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users) ),
                error => dispatch(failure(error.toString()))
            );


    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function _getSearchAll(id) {
    return dispatch => {
        dispatch(request(id));

        userService.getAllSearch(id)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(users, error.toString()))
            );
    };

    function request(users) { return { type: userConstants.GETALLSEARCH_REQUEST, users } }
    function success(users) { return { type: userConstants.GETALLSEARCH_SUCCESS, users }}
    function failure(users, error) { return { type: userConstants.GETALLSEARCH_FAILURE, users, error } }
}

 function getsingle(id) {
     return dispatch => {
         dispatch(request(id));

         userService.getById(id)
             .then(
                 usr => dispatch(success(usr)),
                 error => dispatch(failure(id, error.toString()))
             );


     };




    function request(usr) { return { type: userConstants.GETSINGLE_REQUEST, usr } }
    function success(usr) { return { type: userConstants.GETSINGLE_SUCCESS, usr }}
    function failure(usr, error) { return { type: userConstants.GETSINGLE_FAILURE, usr, error } }
}
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
