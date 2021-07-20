//1 import packages and User model
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const saltRounds = process.env.SALT || 10;

const User = require('../models/User.model');

const isLoggedIn = require('./../middleware/isLoggedIn')
const isNotLoggedIn = require('./../middleware/isNotLoggedIn')

//2 - Create 5 routes: 2 for login, 2 for signup and 1 for logout
/* ***** sign up user ***** */

router.post('/signup', isNotLoggedIn, (req, res)=> {
	const {username, password, email} = req.body

	if (username === "" || password === "" || email === "" || password.length < 4) {
		res.status(400).json({ message: 'valid password, username and email required! Password greater than 4 characters.' })}

		// this could be subsituted by a more advanced validation step
	
	User.findOne({username})
	.then(oneUser => {
	if(oneUser) {
		res.status(400).json({ message: `username ${username} already taken` })
	} else {
	const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

	User.create({username, email, password: hashedPassword})
	.then((newUser)=> res.json(newUser))
	.catch(err => res.json(err))
	// when you are in a catch, it knows there is an error, so it will add the .status(400) itself
}}
)})

router.post('/login', isNotLoggedIn, (req, res) => {
	const {username, password} = req.body
	
	User.findOne({username})
	.then(user=> {
		if(!user) {
			res.status(400).json({ message: `credentials ${username} or ${password} are invalid` })

		} else {
			const encryptedPassword = user.password;
			const passwordCorrect = bcrypt.compareSync(password, encryptedPassword);

			if(passwordCorrect) {
				req.session.currentUser = user
				res.json({message: `User logged in`}) // express will automatically close the response with a 200 positive status code
			} else {
				res.status(400).json({message: 'username or password incorrect'})
			}
		}
	})
	.catch(err=> res.json(err))
})


router.get('/logout', isLoggedIn, (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.status(400).json({ message: 'Something went wrong! Yikes!' });
		} else {
			res.json({message: 'user logged out'});
		}
	})
});

module.exports = router;
