import React from 'react'

function UserProfile(props){
    const {loggedInUser} = props
    console.log(props)
    return(<h1>Hello there {loggedInUser.username}</h1>)

}

export default UserProfile;