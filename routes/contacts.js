const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')
const Contact = require('../models/Contact')


//  @route    GET api/contacts
//  @desc     Get all users contacts
//  @access   Private
router.get('/', auth, 
	async (req,res) => {
		// res.json({
		// 	file: "contacts.js",
		// 	routes: 4,
		// 	req: "GET",
		// 	msg: "Get all contacts..."
		// })
		try {
			const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
			res.json(contacts)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server Error 003')
		}
	}
)

//  @route    POST api/contacts
//  @desc     Add new contact
//  @access   Private
router.post('/', [ auth, [
		check('name', 'Name is required').not().isEmpty()
	] ],
	async (req,res) => {
		// res.json({
		// 	file: "contacts.js",
		// 	routes: 4,
		// 	req: "POST",
		// 	msg: "Add contact..."
		// })
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			})
		}

		const { name, email, phone, type } = req.body

		try {
			const newContact = new Contact({
				name,
				email,
				phone,
				type,
				user: req.user.id
			})

			const contact = await newContact.save()
			res.json(contact)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server Error 004')
		}		
	}
)

//  @route    PUT api/contact/:id
//  @desc     Update contact
//  @access   Private
router.put('/:id', auth, 
	async (req,res) => {
		// res.json({
		// 	file: "contacts.js",
		// 	routes: 4,
		// 	req: "PUT",
		// 	msg: "Update contact (with parameter /:id)..."
		// })
		const { name, email, phone, type } = req.body

		// Build Contact Object
		const contactFields = {}
		if (name) contactFields.name = name
		if (email) contactFields.email = email
		if (phone) contactFields.phone = phone
		if (type) contactFields.type = type

		try {
			let contact = await Contact.findById(req.params.id)

			if (!contact) return res.status(404).json({ msg: 'Contact not found' })

			// Make sure user owns the contact
			if (contact.user.toString() !== req.user.id) {
				return res.status(401).json({ msg: 'Not authorized' })
			}

			contact = await Contact.findByIdAndUpdate(
				req.params.id, 
				{ $set: contactFields },
				{ new: true }
			)

			res.json(contact)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server Error 005')
		}
	}
)

//  @route    DELETE api/contact/:id
//  @desc     Delete contact
//  @access   Private
router.delete('/:id', auth,
	async (req,res) => {
		try {
			let contact = await Contact.findById(req.params.id)

			if (!contact) return res.status(404).json({ msg: 'Contact not found' })

			// Make sure user owns the contact
			if (contact.user.toString() !== req.user.id) {
				return res.status(401).json({ msg: 'Not authorized' })
			}

			await Contact.findByIdAndRemove(req.params.id)

			res.json({ msg: 'Contact removed' })
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server Error 006')
		}
		// res.json({
		// 	file: "contacts.js",
		// 	routes: 4,
		// 	req: "DELETE",
		// 	msg: "Delete contact (with parameter /:id)..."
		// })
	}
)

module.exports = router