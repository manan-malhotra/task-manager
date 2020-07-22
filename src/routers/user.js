const express = require('express');
// require('../db/mongoose');
const User = require('../models/users'),
	router = express.Router();

router.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		res.status(201).send(user);
	} catch (e) {
		res.status(400).send(err);
	}
});
router.get('/users', async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
	const allowedUpdates = [
		'name',
		'email',
		'age',
		'password'
	];
	const updates = Object.keys(req.body);
	const isValid = updates.every((update) => allowedUpdates.includes(update));
	if (!isValid) {
		return res.status(400).send({ error: 'Invalid Updates!' });
	}
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (e) {
		res.status(400).send();
	}
});

router.delete('/users/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
