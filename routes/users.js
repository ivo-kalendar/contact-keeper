const express = require('express')
const router = express.Router()

//  @route    POST api/users
//  @desc     Register a user
//  @access   Public
router.post('/', (req,res) => {
	res.json({
		file: "users.js",
		routes: 1,
		req: "POST",
		msg: "Register a User..."
	})
})

module.exports = router