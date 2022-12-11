import express from 'express'
const app = express()
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import user from './models/user.js'
const router = express.Router();

dotenv.config();
app.use(express.json());


app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
})

mongoose.connect(process.env.CONNECTION_MONGOOSE)
.then(
    () => {
        console.log('Conncection to mongoose successful');
    }
)
.catch(
    (err) => {
        console.error(err);
    }
)





router.get('/', (req, res) => {
    user.find()
      .then(user => res.json(user))
})


router.post('/', (req, res) => {
  const newUser = new user({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address
})
newUser.save().then(user => res.json(user))
})


router.delete('/:id', (req, res) => {
  user.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}))
})


router.put('/:id', (req, res) => {
  const found = user.some(user => user.id === parseInt(req.params.id))
  if(found) {
    const updUser = req.body
    Todo.forEach(user => {
      if(user.id === parseInt(req.params.id)) {
        user.name = updUser.name ? updUser.name : user.name
        user.email = updUser.email ? updUser.email : user.email
        user.address = updUser.address ? updUser.address : user.address
        res.json({ msg: 'User was updated', user })      
      } else {
        res.status(400).json({ms: `No user with the id of ${req.params.id}`})
      }
    })
  }
})



module.exports = router