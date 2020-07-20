express = require('express');
app = express();

port = process.env.PORT || 3000;

app.listen(port, () => {
	'Server started at port ' + port;
});
