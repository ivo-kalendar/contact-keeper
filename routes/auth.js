const express = require('express')
const router = express.Router()

//  @route    GET api/auth
//  @desc     Get loggedin user
//  @access   Private
router.get('/', (req,res) => {
	res.json({
		file: "auth.js",
		routes: 2,
		req: "GET",
		msg: "Get logged in User..."
	})
})

//  @route    POST api/auth
//  @desc     Auth user & get Token
//  @access   Public
router.post('/', (req,res) => {
	res.json({
		file: "auth.js",
		routes: 2,
		req: "POST",
		msg: "Log in User..."
	})
})

module.exports = router