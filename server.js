const express = require('express')
const connectDB = require('./config/db')
const app = express()

//  Connect Database
connectDB()

//  Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req,res) => {
	res.json({
		msg: 'Welcome to the contact keeper API...',
		author: 'Ivo Kalendar',
		mail: 'ivokalendar@icloud.com'
	})
})

// Define Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

// const HOST = 'http://192.168.0.104:' || 'http://localhost:'
const PORT = process.env.PORT || 7788

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))