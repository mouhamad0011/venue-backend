const connection = require('../config/database');


exports.addReservation = async (req, res) => {
  try {
    const {eventID,userId} = req.body; 
    const query = `INSERT INTO reservation (eventID,userId) VALUES (${eventID},${userId})`;
    const [result] = await connection.promise().query(query);
    if(!result){
      throw new Error("could not add");
    }
    const event=result[0];
    res.status(201).json({event}); 
  } catch (error) {
    console.error('Error adding reservation:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const query = "SELECT * FROM reservation";
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getOneReservationById = async (req, res) => {
  try {
    const reserID = req.params.id;
    const query = `SELECT * FROM reservation WHERE ID= ${reserID}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  }
  catch (error) {
    console.log(error);
  }
}

exports.getReservationsByEventId = async (req, res) => {
    try {
      const eventID = req.params.id;
      const query = `SELECT * FROM reservation WHERE eventID= ${eventID}`;
      const [result] = await connection.promise().query(query);
      res.status(200).json(result);
    }
    catch (error) {
      console.log(error);
    }
}

exports.getReservationsByUserId = async (req, res) => {
    try {
      const userID = req.params.id;
      const query = `SELECT * FROM reservation WHERE userID= ${userID}`;
      const [result] = await connection.promise().query(query);
      res.status(200).json(result);
    }
    catch (error) {
      console.log(error);
    }
}

exports.getFullNameTitleDate = async (req, res) => {
  try {
    const query = `SELECT users.fullName,events.title,events.date
                   FROM reservation,users,events
                   WHERE reservation.userID=users.ID
                   AND reservation.eventID=events.ID`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  }
  catch (error) {
    console.log(error);
  }
}



exports.deleteReservation = async (req, res) => {
  const reserID = req.params.id;
  try {
    const query = `DELETE FROM reservation WHERE ID=${reserID}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error' });
  }
};

exports.updateReservation = async (req, res) => {
  const reserID = req.params.id;
  const eventID = req.body.eventID;
  const userID = req.body.userID
  try {
    const query = `UPDATE reservation SET eventID = ${eventID},userID=${userID},
                   WHERE ID=${reserID}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'error' });
  }
};