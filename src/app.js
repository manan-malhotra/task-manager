// const { db } = require('./models/user');

const express = require('express'),
	mongoose = require('mongoose');
require('./db/mongoose');
const User = require('./models/users'),
	Task = require('./models/tasks');
app = express();

port = process.env.PORT || 3000;
// Express use
app.use(express.json());

// Routes
app.post('/users', (req, res) => {
	const user = new User(req.body);

	user
		.save()
		.then(() => {
			res.status(201).send(user);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
});

app.post('/tasks', (req, res) => {
	const task = new Task(req.body);

	task
		.save()
		.then(() => {
			res.status(201).send(task);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
});

app.listen(port, () => {
	console.log('Server started at port ' + port);
});
