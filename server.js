const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const userRouter = require('./Routes/userRoute');
const venueRouter = require('./Routes/venueRoute');
const eventRouter = require('./Routes/eventRoute');
const reserRouter = require('./Routes/reservationRoute');

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/venues', venueRouter);
app.use('/events', eventRouter);
app.use('/reservation',reserRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
