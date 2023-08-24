const express = require("express");

const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  randomPasswordGenerator,
} = require("./services/auth");

const welcome = (req, res) => {
  res.send("welcome sur la plateforme de Prensher");
};
router.get("/users/:user_id", welcome);

/* ---- USERS ROUTES ---- */

const userControllers = require("./controllers/userControllers");

router.post("/user/login", userControllers.authenticationCheck, verifyPassword);

// // récupérer les users d'une entreprise
// router.get("/users", verifyToken, userControllers.getUsers);

// // récupérer un user
// router.get("/users/:user_id", userControllers.getUser);

// // ajouter un utilisateur à une entreprise
// router.post("/users/:user_id", userControllers.insertUser);

// // mettre à jour un profil utilisateur
// router.put(
//   "/users/:user_id",
//   verifyToken,
//   hashPassword,
//   userControllers.updateUserProfile
// );

// // effacer un profil utilisateur
// router.delete("/users/:user_id", verifyToken, userControllers.deleteUser);

// const invitationMiddlewares = require("./middlewares/invitationMiddlewares");

// // Invite a new user
// router.post(
//   "/users",
//   verifyToken,
//   invitationMiddlewares.invitationVerifyUserExists,
//   randomPasswordGenerator,
//   hashPassword,
//   invitationMiddlewares.sendInvitationMail,
//   invitationMiddlewares.invitationNewUser,
//   userControllers.insertUser
// );

const passwordResetMiddlewares = require("./middlewares/passwordResetMiddlewares");

// Send password reset mail
router.post(
  "/password-reset",
  passwordResetMiddlewares.passwordResetVerifyUserExists,
  randomPasswordGenerator,
  hashPassword,
  passwordResetMiddlewares.passwordResetUpdateUserProfile,
  passwordResetMiddlewares.sendResetPasswordMail
);

/* ---- ITEMS ROUTES ---- */

const itemControllers = require("./controllers/itemControllers");

// Get all items for a user
router.get(
  "/users/:user_id/items",
  verifyToken,
  itemControllers.getAllItemsByUser
);

// Get all items
router.get("/items/", verifyToken, itemControllers.getAllItems);

// Create an item
router.post("/items/:userId", verifyToken, itemControllers.createItem);

// Update an item
router.put(
  "/users/:user_id/items/:item_id",
  verifyToken,
  itemControllers.updateItemById
);

// Delete an item
router.delete(
  "/users/:user_id/items/:item_id",
  verifyToken,
  itemControllers.deleteItem
);

/* ---- FAVORITE ROUTES ---- */

const favoriteControllers = require("./controllers/favoriteControllers");

// Get all favorites by a user
router.get(
  "/users/:user_id/favorites",
  verifyToken,
  favoriteControllers.getAllFavoritesByUser
);

// Get all favorites by item
router.get(
  "/items/:item_id/favorites",
  verifyToken,
  favoriteControllers.getAllFavoritesByItem
);

// Create a favorite to an item
router.post(
  "/items/:item_id/favorites/users/:user_id",
  verifyToken,
  favoriteControllers.createFavorite
);

// Delete a favorite from an item
router.delete(
  "/items/:item_id/favorites/users/:user_id",
  verifyToken,
  favoriteControllers.deleteFavorite
);

/* ---- COMMENTS ROUTES ---- */

const commentControllers = require("./controllers/commentControllers");

// Get all comments from an item
router.get(
  "/items/:item_id/comments",
  verifyToken,
  commentControllers.getAllCommentsByItem
);

// Get all comments by a user
router.get(
  "/users/:user_id/comments",
  verifyToken,
  commentControllers.getAllCommentsByUser
);

// Get all comments
router.get("/comments", verifyToken, commentControllers.getAllCountComment);

// Create a comment in an item
router.post(
  "/items/:item_id/comments/users/:user_id",
  verifyToken,
  commentControllers.createComment
);

// Delete a comment
router.delete(
  "/comments/:comment_id",
  verifyToken,
  commentControllers.deleteComment
);

/* ---- CATEGORIES ROUTES ---- */
const categoryControllers = require("./controllers/categoryControllers");

router.get("/categories", categoryControllers.browseCategory);

router.get("/categories/:id", categoryControllers.readCategory);

router.put("/categories/:id", categoryControllers.editCategory);

router.post("/categories", categoryControllers.addCategory);

router.delete("/categories/:id", categoryControllers.destroyCategory);

/* ---- COLORS ROUTES ---- */
const colorControllers = require("./controllers/colorControllers");

router.get("/colors", colorControllers.browseColor);
router.get("/colors/:id", colorControllers.readColor);
router.put("/colors/:id", colorControllers.editColor);
router.post("/colors", colorControllers.addColor);
router.delete("/colors/:id", colorControllers.destroyColor);

module.exports = router;
