// the below is necessary to log in

import axios from 'axios'
const authService = axios.create({
    baseURL: 'http://localhost:5000/auth',
    withCredentials: true // makes sure axios always sends the cookie back to the server - previously not an issue because we were only working in the front end

})

function signup(username, email, password){
    return authService.post('/signup', {username, email, password})
    .then(response => response.data)
    .catch(err => console.log(err))

} // we can invoke the service through this function


function login(username, password){
    return authService.post('/login', {username, password})
    .then(res => res.data)
    .catch(err => console.log(err))
} // you have a route, that has a service connecting it to a component

function logout(){
    return authService.get('/logout')
    .then(res=> res.data) /* we decided in backend that our routes would return a json object - this is the way we are getting hold of the json objects we are sending from the backend i.e. the data, message etc. - see auth-router for info*/
}
/* this service will contact the backend and log out from the backend - to keep track of the front end we need a special state - we need to align the state with the logout response */

export {authService, signup, login, logout}

/* this will allow us to keep the form of the model as a seperate JS form...This form will allow me to import the services into my App with the following "namespace" syntax: */
// import * as authService from './blah'
// then we can use the  functions from the servie in a DOT-NOTATION like auth-service.login()

/* in this file we are calling external functions to call our backend, we will import the service in our components and use it to perform operations with our back-end */