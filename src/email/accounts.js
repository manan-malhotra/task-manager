const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const welcomeMessage = (email, name) => {
	sgMail.send({
		to      : email,
		from    : 'mananmalhotra65@gmail.com',
		subject : 'Thanks for joining in!',
		text    : `Hello ${name}! Thanks for using the Task manager app! Let me know how you get along with the app.`
	});
};

const deleteMessage = (email, name) => {
	sgMail.send({
		to      : email,
		from    : 'mananmalhotra65@gmail.com',
		subject : 'Sorry to see you go!',
		text    : `Goodbye ${name}! \n We would like to see you again soon! `
	});
};

module.exports = { welcomeMessage, deleteMessage };
