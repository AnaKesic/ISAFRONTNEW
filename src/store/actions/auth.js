import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId,role) => {
      
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        role:role
    };
   
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('role')
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: email,
            password: password,
           
        };
        let url = 'http://localhost:8090/api/auth/signin';
        if (!isSignup) {
            url = 'http://localhost:8090/api/auth/signin';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + 3000*1000);
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', authData.username);
                localStorage.setItem('role',response.data.roles);
                dispatch(authSuccess(response.data.token, authData.username,response.data.role));
                dispatch(checkAuthTimeout(3000));
                setAuthRedirectPath('/');
                localStorage.setItem('error', false)
               
            }
           )
            .catch(err => {
                dispatch(authFail(err.response.data.error));
                localStorage.setItem('error',true);
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
            
                dispatch(authSuccess(token, userId,localStorage.getItem('role')));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};
export const register= (user)=>{
       return dispatch=>{
        axios.post('http://localhost:8090/api/auth/signup', user)
            .then(response => {
                
                console.log(response);
                window.location.href="http://localhost:3000/message"
                localStorage.setItem('error', false)
            })
            .catch(err => {
                dispatch(authFail(err));
                localStorage.setItem('error', true)
        });

       }

    };
 export const getAllFlights=()=>{



    
 }
