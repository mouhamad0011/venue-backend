const connection = require('../config/database');


exports.addEvent = async (req, res) => {
  try {
    const {title,date,ticketPrice,description,venueID} = req.body; 
    const query = `INSERT INTO events (title,date,ticketPrice,description,venueID) VALUES ('${title}','${date}',${ticketPrice},'${description}',${venueID})`;
    const [result] = await connection.promise().query(query);
    if(!result){
      throw new Error("could not add");
    }
    const event=result[0];
    res.status(201).json({event}); 
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const query = "SELECT * FROM events";
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getOneEventById = async (req, res) => {
  try {
    const eventID = req.params.id;
    const query = `SELECT * FROM venues WHERE ID= ${eventID}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  }
  catch (error) {
    console.log(error);
  }
}





exports.deleteEvent = async (req, res) => {
  const eventID = req.params.id;
  try {
    const query = `DELETE FROM events WHERE ID=${eventID}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error' });
  }
};

exports.updateEvent = async (req, res) => {
  const eventID = req.params.id;
  const newTitle = req.body.title;
  const newDate = req.body.date;
  const newTicketPrice= req.body.ticketPrice;
  const newDescription = req.body.description;
  const newVenueID = req.body.venueID;
  try {
    const query = `UPDATE events SET title = '${newTitle}',date=${newDate},
    ticketPrice='${newTicketPrice}',description = '${newDescription}',venueID='${newVenueID}' 
     WHERE ID=${eventID}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'error' });
  }
};