const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: "",
  database: process.env.DB_NAME,
  connectionLimit:10
});

// const createUsersQuery = `CREATE TABLE IF NOT EXISTS users (
//   ID INT AUTO_INCREMENT PRIMARY KEY,
//   fullName VARCHAR(50),
//   email VARCHAR(100) UNIQUE,
//   password VARCHAR(255),
//   role VARCHAR(20)
// )`;
// connection.promise().query(createUsersQuery)
//   .then(() => {
//     console.log(`users has been created `);
//     // connection.release();
//   })
//   .catch((error) => {
//     console.error(`Error creating table "users":`, error);
//   });

//   const createVenuesQuery = `
//   CREATE TABLE IF NOT EXISTS venues (
//     ID INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255),
//     description VARCHAR(255),
//     capacity INT,
//     image VARCHAR(255),
//     address VARCHAR(255)
//   )
// `;

// connection.promise().query(createVenuesQuery)
//   .then(() => {
//     console.log(`venues has been created`);
//     // connection.release();
//   })
//   .catch((error) => {
//     console.error(`Error creating table venues:`, error);
//   });


//   const createReservationQuery = `
//   CREATE TABLE IF NOT EXISTS reservation (
//     ID INT AUTO_INCREMENT PRIMARY KEY,
//     venueID INT,
//     userID INT,
//     FOREIGN KEY (venueID) REFERENCES venues(ID) ON DELETE CASCADE ON UPDATE CASCADE
//     FOREIGN KEY (userID) REFERENCES users(ID) ON DELETE CASCADE ON UPDATE CASCADE
//   )
// `;

// connection.promise().query(createReservationQuery)
//   .then(() => {
//     console.log(`reservation has been created`);
//     // connection.release();
//   })
//   .catch((error) => {
//     console.error(`Error creating table reservation:`, error);
//   });

//   const createEventsQuery = `
//   CREATE TABLE IF NOT EXISTS events (
//     ID INT AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(255),
//     date DATE,
//     ticketPrice INT,
//     description VARCHAR(255),
//     venueID INT,
//     FOREIGN KEY (venueID) REFERENCES venues(ID) ON DELETE CASCADE ON UPDATE CASCADE
//   )
// `;

// connection.promise().query(createEventsQuery)
//   .then(() => {
//     console.log(`events has been created`);
//     // connection.release();
//   })
//   .catch((error) => {
//     console.error(`Error creating table events:`, error);
//   });



module.exports = connection;