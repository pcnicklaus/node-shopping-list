var express = require('express');
var router = express.Router();

// route handler for route
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// route handler for items
router.get('/items', function(req, res) {
  res.json(storage.items);
});

// post handler for items
router.post('/items', function(req, res) {
  // var sausage = newItem(sausage);
  storage.addItem(req.body.name);
  res.json(storage.items);
});

router.put('/item/:id', function (req, res) {
  if (storage.items[req.params.id]) {
    storage.items[req.params.id].name = req.body.name;
    res.json(storage.items);
  } else {
    storage.addItem(req.body.name);
    res.json(storage.items);
  }
});

router.delete('/item/:id', function (req, res) {
  if (storage.items[req.params.id]) {
    storage.items.splice(req.params.id, 1);
    res.json(storage.items);
  } else {
    res.json(storage.items);
  }
});

// constructor
function ItemLibrary() {
  this.items = [];
  this.id = 0;
}

// methods
ItemLibrary.prototype.addItem = function(name) {
  var newItem = {name: name, id: this.id};
  this.items.push(newItem);
  this.id += 1;
};

// create some instances
var storage = new ItemLibrary();
storage.addItem('Noodles');
storage.addItem('Tomatoes');
storage.addItem('Peppers');

//new item
// storage.addItem('Sausage');

module.exports = router;
