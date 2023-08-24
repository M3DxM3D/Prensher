/* eslint-disable camelcase */
const models = require("../models");

const authenticationCheck = (req, res, next) => {
  const { email } = req.body;

  models.user
    .getUserByMail(email)
    .then(([users]) => {
         if (users[0] != null) {
        [req.user] = users;
        next();
      } else {
        res.sendStatus(403);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const createNewUser = (req, res) => {
  models.user
    .createUser(req.body)
    .then(([rows]) => {
      if (rows.affectedRows) {
        res.status(201).send(rows);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err.code === "ER_DUP_ENTRY") {
        res.sendStatus(409);
      } else {
        console.error(err);
        res.sendStatus(500);
      }
    });
};

// récupérer l'ensemble des utilisateurs
const getUsers = (req, res) => {
  models.user
    .getAllUsers()
    .then(([result]) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.sendStatus(500);
    });
};

// récupérer un utilisateur
const getUser = (req, res) => {
  const { user_id} = req.params;
  models.user
    .getOneUser( user_id)
    .then(([result]) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.sendStatus(500);
    });
};

// ajouter un utilisateur 

const insertUser = (req, res) => {
  const {  userId,firtname,lastname,email,picture_url} = req.body;
  models.user
    .addUser( body)
    .then(([rows]) => {
      if (rows) {
        res.sendStatus(201);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// mettre à jour un profil utilisateur
const updateUserProfile = (req, res) => {
  const { user_id } = req.params;

  if (req.body.hashed_password) {
    req.body.password = req.body.hashed_password;
    delete req.body.hashed_password;
  }
  models.user
    .modifyUserProfile(user_id, req.body)
    .then(([rows]) => {
      delete req.body.password;
      if (rows) {
        res.status(200).send(req.body);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// effacer un utilisateur
const deleteUser = (req, res) => {
  const { user_id } = req.params;
  models.user
    .deleteUserProfile(user_id)
    .then(([rows]) => {
      if (rows) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};


module.exports = {
  getUsers,
  getUser,
  insertUser,
  updateUserProfile,
  deleteUser,
  authenticationCheck,
  createNewUser,
};
