'use strict';


const bcrypt = require('bcrypt');
const validationResult = require('express-validator');
const database = require('../db/models/index');

// delete user
exports.DeleteUser =async (req, res, next) => {
    let uid = parseInt(req.params.id);  
    try {
        let fetchedUser = await database.users.findOne({ where: { id: uid },include :[database.communities ,database.posts]  });
        await database.users.destroy({ where: { id: uid } });
       res.status(201).json({fetchedUser :fetchedUser,message :'deleted successfully' });
    } catch(error)  {
        console.log(error);
        res.status(500).json({ error: error });
    }
     
    
}

// update user data
exports.updateUser = (req, res, next) => {
    db.Users.update({ username: req.body.name, firstName: req.body.fname, lastName: req.body.lname, email: req.body.email }).exec().then(result => {
        res.status(200).json({ message: 'user have been Updeted' })
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    })
}
// change the password
exports.changePassword = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        console.log(error.array());
        return res.status(422).json({ error: error.array() });
    }
    else {
        db.Users.update({ password: req.body.password }).exec()
            .then(bcrypt.hash(req.body.password, 5, (err, hash) => {
                if (err) {
                    return res.status(500).json({ err })
                }
                else {
                    db.Users.findById(req.params.id, (err, user) => {
                        if (err) {
                            return next(err);
                        }
                        user.password = hash
                        user.save()
                    }).then(() => {
                        res.status(201).json({ message: 'password have been changed' });

                    }).catch(error => {
                        console.log(error);
                        res.status(500).json({ error: error })
                    })

                }
            }))
    }
}

// To call all the user
exports.allUsers = (req, res, next) => {
    db.Users.find({}).exec().then(result => {
        res.status(200).json({ result });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: error })

    })

}

// when the session is end logout the user
exports.userLogout = (req, res, next) => {
    console.log('******');
    // console.log(req);
    return res.redirect('/');
    // if (req.session) {
    //     console.log('after if');
    //     req.session.destroy(error => {
    //         if (error) {
    //             console.log('0000000000');
    //             res.status(500).json({ error: error })
    //             return next(error);

    //         }
    //         else {
    //             res.send('dddddddddddddd');
    //             // return res.redirect('/');
    //         }
    //     })
    // }
}