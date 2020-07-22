const express = require('express');
// require('../db/mongoose');
const Task = require('../models/tasks'),
	router = express.Router();

router.post('/tasks', async (req, res) => {
	const task = new Task(req.body);

	try {
		await task.save();
		res.status(201).send(task);
	} catch (e) {
		res.status(400).send(err);
	}
});

router.get('/tasks', async (req, res) => {
	try {
		const task = await Task.find({});
		res.send(task);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
	const allowedUpdates = [
		'description',
		'completed'
	];
	const updates = Object.keys(req.body);
	const isValid = updates.every((update) => allowedUpdates.includes(update));
	if (!isValid) {
		return res.status(400).send({ error: 'Invalid Updates!' });
	}

	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (e) {
		res.status(400).send();
	}
});

router.delete('/tasks/:id', async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
