import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// this Redirect component (above) simulates a readirect and is imported from the react-router-dom
 
/* We are conditionally returning a route, and/ or redirecting */
function ProtectedRoute(props){

    const  { component: Component, user, path, ...rest} = props
    // the component is renamed with a capital letter
    // long way to write the component is const Component = props.component


 
  if (user) {
    return <Route path={path} render={routeProps => <Component {...routeProps} loggedInUser={user} />} />;
  } else {
    return <Redirect to={{ pathname: '/', state: { from: rest.location } }} />;
  } // redirect always takes a path name and a state - it is a way to redirect without reloading
};
 
export default ProtectedRoute;

/* This component is imported and used inside the router in App.js */

// to have a protected route you must pass a user or use a render function to set a user