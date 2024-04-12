const express = require('express')
const sequelize = require('./util/database');
const User = require('./models/users');


const app = express()
app.use(express.json())

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
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

sequelize.sync({force:false})
    .then(() => app.listen(process.env.EXTERNALPORT))
    .catch(err => log.error(err))