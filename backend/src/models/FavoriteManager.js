const AbstractManager = require("./AbstractManager");

class FavoriteManager extends AbstractManager {
  constructor() {
    super({ table: "favorite" });
  }

  postFavorite(itemId, userId) {
    return this.database.query(
      `insert into ${this.table} (item_id, user_id) values (?, ?)`,
      [itemId, userId]
    );
  }

  findAllFavoritesByItem(itemId) {
    return this.database.query(
      `SELECT COUNT(id) FROM ${this.table} WHERE idea_id = ?`,
      [itemId]
    );
  }

  findAllFavoritesByUser(userId) {
    return this.database.query(
      `SELECT COUNT(id) FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );
  }

  delete(itemId, userId) {
    return this.database.query(
      `delete from ${this.table} where ${this.table}.item_id = ? AND user_id = ?`,
      [itemId, userId]
    );
  }
}
module.exports = FavoriteManager;
