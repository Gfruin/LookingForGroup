// require mongoose
const mongoose = require('mongoose');

//make connection string

const connectionString = process.env.MONGODB_URI


mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
})


//connection.on connect
mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected');
})
//connection.on disconnect
mongoose.connection.on('disconnected', () => {
	console.log('Mongoose is disconnected');
})
//connection.on.error

mongoose.connection.on('err', (err) => {
	console.log('mongoose hit an error', err);
})