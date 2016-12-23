var express = require('express');
var router = express.Router();

const argv = require('yargs').argv;
const PORT = argv.port || argv.p || 3000;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', socket_port: PORT });
});

module.exports = router;
