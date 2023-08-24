/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  getUserByMail(email) {
    return this.database.query(
      `SELECT ${this.table}.id,${this.table}.firstname, ${this.table}.lastname, ${this.table}.email, ${this.table}.password FROM ${this.table} WHERE email = ?`, [email]
    );
  }

  
  // récupérer tous les utilisateurs
  getAllUsers() {
    return this.database.query(
      `SELECT ${this.table}.id,${this.table}.firstname,${this.table}.lastname,${this.table}.email,${this.table}.picture_url FROM ${this.table}`
      );
    } 
    
    // récupérer un utilisateur
    getOneUser(userId) {
      return this.database.query(
        `SELECT ${this.table}.id, ${this.table}.firstname,${this.table}.lastname,${this.table}.email,${this.table}.picture_url FROM ${this.table} WHERE id =?`,
        [userId]
        );
      }
      
      // ajouter un utilisateur
      addUser( userId,firtname,lastname,email,picture_url) {
        return this.database.query(
          `INSERT INTO ${this.table}(firstname,lastname,email,picture_url) VALUES (?,?,?,?);`, [
            userId,firtname,lastname,email,picture_url
          ]);
        }
        
        modifyUserProfile(userId, user) {
          const keys = Object.keys(user);
          const values = Object.values(user);
    const valueQuery = keys.map((key) => `${key} = ?`).join(", ");
    
    return this.database.query(
      `UPDATE ${this.table} SET ${valueQuery} WHERE id = ?;`,
      [...values, userId]
      );
    }
    
    // supprimer un utilisateur
    deleteUserProfile(userId) {
      return this.database.query(`DELETE FROM ${this.table} WHERE user_id = ?`, [
        userId,
      ]);
    }
    
    createUser(user) {
    const { email, hashed_password } = user;
    return this.database.query(
    `insert into ${this.table} (email, password) values (?, ?);`,
    [email, hashed_password]
     );
   }
    
  }
  module.exports = UserManager;
