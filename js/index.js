const express = require('express')
const sequelize = require('./util/database');
const User = require('./models/users');
const path = require('path');


const app = express()
app.use(express.json())
app.use('/', express.static(path.join(__dirname + '/public/templates')))

// const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Docker World!')
})

app.post('/users', async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.create({
            username,
            email
        });
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.post('/test', (req, res) => {
    console.log(req.body); // { message: 'Hello from the frontend!' }
    // Handle your logic here
    res.status(200).json({ message: 'Response from the backend' });
  });

  sequelize.sync({ force: false }).then(() => {
    app.listen(process.env.EXTERNALPORT, () => {
      console.log(`Server is running on port ${process.env.EXTERNALPORT}`);
    });
  }).catch(err => console.error(err));