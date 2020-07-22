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

// Post requests
app.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		res.status(201).send(user);
	} catch (e) {
		res.status(400).send(err);
	}
});

app.post('/tasks', async (req, res) => {
	const task = new Task(req.body);

	try {
		await task.save();
		res.status(201).send(task);
	} catch (e) {
		res.status(400).send(err);
	}
});
// Get Request
app.get('/users', async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (e) {
		res.status(500).send(e);
	}
});

app.get('/users/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const user = await User.findById({ _id });
		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});

app.get('/tasks', async (req, res) => {
	try {
		const task = await Task.find({});
		res.send(task);
	} catch (e) {
		res.status(500).send(e);
	}
});

app.get('/tasks/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findById({ _id });
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (e) {
		res.status(500).send();
	}
});

// Listen
app.listen(port, () => {
	console.log('Server started at port ' + port);
});
