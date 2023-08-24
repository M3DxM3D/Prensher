const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  postComment(comment, itemId, userId) {
    const { content } = comment;
    return this.database.query(
      `INSERT INTO ${this.table} (content, item_id, user_id ) VALUES (?, ?, ?)`,
      [content, itemId, userId]
    );
  }

  findAllCommentsByItem(itemId) {
    return this.database.query(
      `SELECT ${this.table}.content, user.firstname, user.lastname FROM ${this.table} INNER JOIN user ON user.id = ${this.table}.user_id WHERE item_id = ?`,
      [itemId]
    );
  }

  findAllCommentsByUser(userId) {
    return this.database.query(
      `SELECT COUNT(id) FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );
  }

  findAllCountComments() {
    return this.database.query(`SELECT COUNT(id) FROM ${this.table}`);
  }

  delete(commentId) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE ${this.table}.id = ?`,
      [commentId]
    );
  }
}
module.exports = CommentManager;
