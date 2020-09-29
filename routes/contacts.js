const express = require('express')
const router = express.Router()

//  @route    GET api/contacts
//  @desc     Get all users contacts
//  @access   Private
router.get('/', (req,res) => {
	res.json({
		file: "contacts.js",
		routes: 4,
		req: "GET",
		msg: "Get all contacts..."
	})
})

//  @route    POST api/contacts
//  @desc     Add new contact
//  @access   Private
router.post('/', (req,res) => {
	res.json({
		file: "contacts.js",
		routes: 4,
		req: "POST",
		msg: "Add contact..."
	})
})

//  @route    PUT api/contact/:id
//  @desc     Update contact
//  @access   Private
router.put('/:id', (req,res) => {
	res.json({
		file: "contacts.js",
		routes: 4,
		req: "PUT",
		msg: "Update contact (with parameter /:id)..."
	})
})

//  @route    DELETE api/contact/:id
//  @desc     Delete contact
//  @access   Private
router.delete('/:id', (req,res) => {
	res.json({
		file: "contacts.js",
		routes: 4,
		req: "DELETE",
		msg: "Delete contact (with parameter /:id)..."
	})
})

module.exports = router