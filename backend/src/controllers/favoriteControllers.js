/* eslint-disable camelcase */
const models = require("../models");

const createFavorite = (req, res) => {
  const { user_id, item_id } = req.params;
  models.favorite
    .postFavorite(item_id, user_id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(201);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAllFavoritesByUser = (req, res) => {
  models.favorite
    .findAllFavoritesByUser(req.params.user_id)
    .then(([result]) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAllFavoritesByItem = (req, res) => {
  models.favorite
    .findAllFavoritesByItem(req.params.item_id)
    .then(([result]) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteFavorite = (req, res) => {
  const { item_id, user_id } = req.params;
  models.favorite
    .delete(item_id, user_id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
module.exports = {
  getAllFavoritesByUser,
  getAllFavoritesByItem,
  createFavorite,
  deleteFavorite,
};
