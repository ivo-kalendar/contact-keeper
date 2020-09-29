const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')

//  @route    POST api/users
//  @desc     Register a user
//  @access   Public
router.post('/', [
		check(
			'name', 
			'Please add Name'
		).not().isEmpty(),
		check(
			'email', 
			'Please include a valid email'
		).isEmail(),
		check(
			'password', 
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 })
	], 
	async (req,res) => {
		const errors = validationResult(req)
		if(!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			})
		}

		const { name, email, password } = req.body

		try {
			let user = await User.findOne({ email })

			if (user) {
				return res.status(400).json({ msg: 'User already exists' })
			}

			user = new User({ name, email, password })

			const salt = await bcrypt.genSalt(10)

			user.password = await bcrypt.hash(password, salt)

			await user.save()

			res.send('User Saved')

		} catch (err) {
			console.error(err.message)
			res.satatus(500).send('Server Error...')
		}

	// res.json({
	// 	file: "users.js",
	// 	routes: 1,
	// 	req: "POST",
	// 	msg: "Register a User..."
	// })
})

module.exports = router