import React from 'react'

function UserProfile(props){
    return(<h1>Hello {props.loggedInUser.username}</h1>)

}

export default UserProfile;