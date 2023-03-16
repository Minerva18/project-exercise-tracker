const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

require("./db/mongoose")

const userRouter = require("./routers/user");

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded());

app.use((req, res, next) => {
  console.log('----- New Request Info Start -----');
  console.log("path >> ", req.path);
  console.log("method >> ", req.method);
  console.log("params >> ", req.params);
  console.log("body >> ", req.body);
  console.log('----- New Request Info End -----');
  next();
});

app.use(express.static('public'));

app.use('/api', userRouter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
