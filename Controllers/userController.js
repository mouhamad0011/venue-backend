const connection = require('../config/database');

exports.addUser = async (req, res) => {
  try {
    const {fullName,email, password,role} = req.body; 
    const query = `INSERT INTO users (fullName,email, password,role) VALUES ('${fullName}','${email}','${password}','${role}')`;
    const [result] = await connection.promise().query(query);
    if(!result){
      throw new Error("could not add");
    }
    const user=result[0];
    res.status(201).json({user}); 
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getOneUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const query = `SELECT * FROM users WHERE ID= ${userId}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  }
  catch (error) {
    console.log(error);
  }
}


exports.getOneUserByEmailPassword = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const [result] = await connection.promise().query(query, [email, password]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Logged in successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};


exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const query = `DELETE FROM users WHERE ID=${userId}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'errorrr' });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  try {
    const query = `UPDATE users SET email = '${newEmail}', password = '${newPassword}' WHERE ID=${userId}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'error' });
  }
};