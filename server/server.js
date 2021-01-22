const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const crypto = require('crypto');

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'build')));

//routes
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
})

app.post('/signup', async (req, res) => {
	console.log(req.body);
	const user = req.body;
	const userquery = await db.query('SELECT * FROM users WHERE username=$1', [user.username]);
	
	//Check that user doesn't exist
	if (userquery.rowCount === 0) {
		const sessionid = randomString();
		await db.query('INSERT INTO users(username, password, sessionid) VALUES ($1, $2, $3)', [user.username, user.password, sessionid]);
		res.setHeader('Set-Cookie', [`SESSION_ID=${sessionid};HttpOnly`])
		res.send({"success": "Created user with success"})
	}
	else {
		console.error('username already exists')
		res.send('whoopsadaisy user exists and stuff')
		return;
	}

});

app.post('/login', async (req, res) => {
	
	const user = req.body;
	const userquery = await db.query('SELECT FROM users WHERE username=$1', [user.username]);
	dbuser = userquery.rows[0];

	//Check that user exists
	if (userquery.rowCount !== 0) {
		//Check that passwords match
		if (dbuser.password == user.password) {
			
			console.log('login successful yay');
			const sessionid = randomString();
			const sql = 'update users set sessionid = $1 where username = $2';
			const result = await db.query(sql, [sessionid, user.username]);
			console.log(result);

			res.setHeader('Set-Cookie', [`SESSION_ID=${sessionid};HttpOnly`]);
			res.send({"success":"Created a user successfully"});

		} else {
			
			console.error('login failed nayy :(');
			res.send({"error":"username or password incorrect"});

		}

	}
	else {
		res.send({ "error": "username or password incorrect" });
		console.error("user doesn't exist");
	}

})

app.listen(8080, () => {
	console.log("Express server started successfully");
});

function randomString() {
	const randomstring = crypto.randomBytes(64).toString('hex');
	return randomstring;
}