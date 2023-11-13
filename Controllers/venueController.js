const connection = require('../config/database');
const cloudinary=require('../cloudinary')

// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });

exports.addVenue = async (req, res) => {
  try {
    const {name,description, capacity,address} = req.body; 
    const b64 =req.file.buffer.toString('base64');
    let image = 'data:' + req.file.mimetype + ';base64,' + b64;
    const url=await cloudinary.uploader.upload(image,{folder:'venues'})
    const query = `INSERT INTO venues (name,description, capacity,image,address) VALUES ('${name}','${description}',${capacity},'${url.secure_url}','${address}')`;
    const [result] = await connection.promise().query(query);
    if(!result){
      throw new Error("could not add");
    }
    const venue=result[0];
    res.status(201).json({venue}); 
    //console.log(url.secure_url)
  } catch (error) {
    console.error('Error adding venue:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getAllVenues = async (req, res) => {
  try {
    const query = "SELECT * FROM venues";
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getOneVenueById = async (req, res) => {
  try {
    const venueID = req.params.id;
    const query = `SELECT * FROM venues WHERE ID= ${venueID}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  }
  catch (error) {
    console.log(error);
  }
}





exports.deleteVenue = async (req, res) => {
  const venueID = req.params.id;
  try {
    const query = `DELETE FROM venues WHERE ID=${venueID}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error' });
  }
};

exports.updateVenue = async (req, res) => {
  const venueID = req.params.id;
  const newName = req.body.name;
  const newDescription = req.body.description;
  const newCapacity= req.body.capacity;
  const b64 =req.file.buffer.toString('base64');
  let image = 'data:' + req.file.mimetype + ';base64,' + b64;
  const url=await cloudinary.uploader.upload(image,{folder:'venues'})
  const newAddress = req.body.address;
  try {
    const query = `UPDATE venues SET name = '${newName}', description = '${newDescription}',
    capacity=${newCapacity},image='${url.secure_url}',address='${newAddress}' WHERE ID=${venueID}`;
    const [result] = await connection.promise().query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'error' });
  }
};