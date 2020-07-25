require('./db/mongoose');
const express = require('express'),
	userRouter = require('./routers/user'),
	taskRouter = require('./routers/task'),
	app = express(),
	port = process.env.PORT;
// App use
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// Listen
app.listen(port, () => {
	console.log('Server started at port ' + port);
});
