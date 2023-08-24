const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "item" });
  }


  findAllItemsByUser(userId) {
    return this.database.query(
      `SELECT
        ${this.table}.id,
        ${this.table}.title, 
        ${this.table}.description, 
        ${this.table}.location,
        ${this.table}.is_available, 
        ${this.table}.type, 
        ${this.table}.creation_date,
        user.firstname AS creator_firstname,
        user.lastname AS creator_lastname,
        user.email AS creator_email,
        user.picture_url AS creator_picture_url,
        COUNT(favorite.id) AS favorite_count,
        comments.comments_count AS comments_count,
        GROUP_CONCAT(DISTINCT cat.name, "|", col.name) AS categories,
        CASE WHEN favorite_by_user.item_id IS NOT NULL THEN true ELSE false END AS is_favorite_by_user
      FROM ${this.table}
      INNER JOIN user ON user.id = ${this.table}.user_id
      LEFT JOIN (
        SELECT item_id, COUNT(*) AS comments_count
        FROM comment
        GROUP BY item_id
      ) comments ON comments.item_id = ${this.table}.id
      LEFT JOIN favorite ON favorite.item_id = ${this.table}.id
      LEFT JOIN comment AS c ON c.item_id = ${this.table}.id
      LEFT JOIN user AS cu ON cu.id = c.user_id
      LEFT JOIN category_has_item ON ${this.table}.id = category_has_item.item_id
      LEFT JOIN category AS cat ON cat.id = category_has_item.category_id
      LEFT JOIN favorite favorite_by_user ON favorite_by_user.item_id = ${this.table}.id AND favorite_by_user.user_id = ?
      LEFT JOIN color col ON col.id = cat.color_id
      WHERE user.id = ?
      GROUP BY ${this.table}.id
      ORDER BY ${this.table}.creation_date DESC;`,
      [userId, userId]
    );
  }

  findAllItems() {
    return this.database.query(
      `SELECT
        ${this.table}.id,
        ${this.table}.picture,
        ${this.table}.title, 
        ${this.table}.description, 
        ${this.table}.location,
        ${this.table}.is_available, 
        ${this.table}.type, 
        ${this.table}.creation_date
       FROM ${this.table}`
    );
  }
  
  insert(item, userId) {

    const { picture,title, description, location, isAvailable, type} = item; 
    return this.database.query(
      `INSERT INTO ${this.table} (picture,title, description, location, is_available, type, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
      [picture,title, description, location, isAvailable, type, userId]
    );
  }

  update(item, userId, itemId) {
    const { picture,title, description, location, isAvailable, type } = item; 
    return this.database.query(
      `UPDATE ${this.table} SET 
        title = ?, 
        description = ?, 
        location = ?, 
        is_available = ?, 
        type = ?,
        user_id = ?
      WHERE ${this.table}.id = ?`,
      [title, description, location, isAvailable, type, userId, itemId]
    );
  }
}

module.exports = ItemManager;
