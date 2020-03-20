var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/ping', function (req, res) {
  res.send('pong!');
});
app.post('/analytics', function (req, res) {
  res.send('Success!');
  console.log(req);
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
