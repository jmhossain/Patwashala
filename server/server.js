const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const crypto = require('crypto');

//middleware
app.use(express.json())
app.use(express.static(path.join(__dirname,'../','build')))

//routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'build', 'index.html'))
})

app.post('/signup', async(req, res) => {
  console.log(req.body);
  const user = req.body;
  checkdb = await db.query('SELECT * FROM users WHERE username=$1',[user.username])
  if ((checkdb.rowCount > 0)){
    console.error('username already exists')
    res.send('whoopsadaisy user exists and stuff')
    return;
  }
  else{
    console.log(await db.query('INSERT INTO users(username, password) VALUES ($1, $2)',[user.username, user.password]))
  }
});

app.post('/login',async (req, res) => {
  const user = req.body;
  checkdb = await db.query('SELECT FROM users WHERE username=$1',[user.username]);
  dbuser = checkdb.rows[0];
  
  //fail
  if(checkdb.rowCount === 0){
    res.send({error:"sry no user by that name exists"})
    console.error("user doesn't exist");
  }
  else{
    if(dbuser.password == user.password){
      console.log('login successful yay');
      const sessionid = randomString();
      const sql = 'update users set sessionid = $1 where username = $2';
      const result = await db.query(sql,[sessionid, user.username]);
      console.log(result);

      res.setHeader('Set-Cookie', [`SESSION_ID=${sessionid};HttpOnly`])
    }else{
      console.error('login failed nayy :(')
    }
  }
})
app.listen(8080, () => {
  console.log("Express server started successfully")
})
function randomString(){
  const randomstring = crypto.randomBytes(64).toString('hex');
  return randomstring;
}