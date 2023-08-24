const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  insert(name, colorId) {
    return this.database.query(
      `insert into ${this.table} (name, color_id) values (?,?)`,
      [name, colorId ]
    );
  }

  update(name, colorId,categoryId) {
    return this.database.query(
      `update ${this.table} set name = ?, color_id = ? where id = ?`,
      [name, colorId,categoryId]
    );
  }
}

module.exports = CategoryManager;
