const router = require('express').Router();
let User = require('../models/user.model');
const fs = require('fs');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const newUser = new User({ username })

    newUser.save()
        .then(() => res.json({ 
            status: 'success',
            username: username }))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:username').delete((req, res) => {
    User.findOneAndDelete({ username: req.params.username })
        .then((user) => res.json({
            message: 'User deleted!',
            userId: user._id
        }))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/download').get(async (req, res) => {
    await _saveUsersToFile('download_users.json');
   
    res.download('./download_users.json', (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
})

_saveUsersToFile = async (fileName) => {
    let allUsers = await User.find();
    let users = await allUsers.map(user => {
        let rObj = {}
        rObj["username"] = user.username
        return rObj;
    });
    const finalObj = {
        fileName: fileName,
        users: users
    }
    
    return fs.writeFileSync(`./${fileName}`, JSON.stringify(finalObj));
}


module.exports = router