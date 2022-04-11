'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const validationResult = require('express-validator');
const db = require('../db/models/users');

// delete user
exports.DeleteUser = (req, res, next) => {
    db.Users.remove({ id: req.params.id }).exec().then(result => {
        res.status(200).json({ message: 'user have been deleted' });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    })
}

// change user data
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
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res.status(500).json({ error: error })
                return next(error);

            }
            else {
                return res.redirect('/')
            }
        })
    }
}