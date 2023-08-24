/* eslint-disable camelcase */
const models = require("../models");

// Create a new item associated with the user ID (user_id)
const createItem = (req, res) => {
  const { title, description, location, is_available, type } = req.body;
  const { userId } = req.params;

  models.item
    .insert(req.body, userId)
    .then(([result]) => {
      if (result.affectedRows === 1) {
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

// Get all items associated with a specific user
const getAllItemsByUser = (req, res) => {
  models.item
    .findAllItemsByUser(req.params.user_id)
    .then(([results]) => {
      console.log(results);
      
      if (results.length) {
        res.status(200).json(results); 
      } else {
        res.sendStatus(404); // Not Found
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500); // Internal Server Error
    });
};

// Get all items
const getAllItems = (req, res) => {
  models.item
    .findAllItems()
    .then(([results]) => {
      if (results.length) {
        res.status(200).json(results); // OK with the list of items in JSON
      } else {
        res.sendStatus(404); // Not Found
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500); // Internal Server Error
    });
};

// Update an item by its ID associated with the user ID (user_id)
const updateItemById = (req, res) => {
  models.item
    .update(req.body, req.params.user_id, req.params.item_id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404); // Not Found
      } else {
        res.status(204).send("L'objet a été mis à jour avec succès"); // No Content
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500); // Internal Server Error
    });
};

// Delete an item by its ID
const deleteItem = (req, res) => {
  models.item
    .delete(req.params.item_id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404); // Not Found
      } else {
        res.status(204).send("L'objet a été supprimé avec succès"); // No Content
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500); // Internal Server Error
    });
};

module.exports = {
  getAllItemsByUser,
  getAllItems,
  updateItemById,
  createItem,
  deleteItem,
};
