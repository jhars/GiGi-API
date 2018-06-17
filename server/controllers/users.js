const User = require('../models').User;

module.exports = {
  create(req, res) {
    return User
      .create({
        firstName: req.body.firstName,
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },

  read(req, res) {
    return User
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update({
            firstName: req.body.firstName || user.firstName, //why the OR statement?
          })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    var firstName;
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(200).send(user)) //Better practice to return 204 Response Code here?
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
