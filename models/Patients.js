// import database
const db = require("../config/database");

// membuat class Model Patient
class Patient {
  // Membuat method static all
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from patients";
      db.query(sql, (err, results) => {
        resolve(results);
      });
    });
  }

  // Membuat method static create
  static create(data) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO patients SET ?", data, (err, results) => {
        if (err) throw err;
      });
    });
  }

  // Membuat method static find
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE id = ?";

      db.query(sql, id, (err, results) => {
        const [patient] = results;
        resolve(patient);
      });
    });
  }

  // membuat method update dengan asynchronus
  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = "UPDATE patients SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        resolve(results);
      });
    });
    const patient = await this.find(id);
    return patient;
  }

  // membuat method destroy dengan asynchronus
  static destroy(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  static search(name) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM patients WHERE name like  '%${name}%'`;
      db.query(sql, name, (err, results) => {
        //destructing array
        const [patient] = results;
        resolve(patient);
      });
    });
  }

  // ini model positif / recovered / dead
  // method findbystatus
  static async findByStatus(status) {
    // find data by positive status
    if (status == "positive") {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM patients WHERE status = 'Positive'";
        db.query(sql, status, (err, results) => {
          resolve(results);
        });
      });
    }
    // find data by recovered status
    else if (status == "recovered") {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM patients WHERE status = 'Recovered'";
        db.query(sql, status, (err, results) => {
          resolve(results);
        });
      });
    }
    // find data by dead status
    else if (status == "dead") {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM patients WHERE status = 'dead'";
        db.query(sql, status, (err, results) => {
          resolve(results);
        });
      });
    }
  }
}

// export class Patient
module.exports = Patient;
