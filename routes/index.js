var express = require('express');
var router = express.Router();


let serverArray = [];

let NoteObject = function (pName, pType, pAddress, pStar, pURL){
    this.Name= pName;
    this.Type= pType;
    //this.ID= NoteArray.length + 1;
    this.ID= Math.random().toString(16).slice(5)
    this.Address = pAddress;
    this.Star = pStar;
    this.URL= pURL;
}

var fs = require("fs");

let fileManager  = {
  read: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    let goodData = JSON.parse(rawdata);
    serverArray = goodData;
  },

  write: function() {
    let data = JSON.stringify(serverArray);
    fs.writeFileSync('objectdata.json', data);
  },

  validData: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    console.log(rawdata.length);
    if(rawdata.length < 1) {
      return false;
    }
    else {
      return true;
    }
  }
};

if(!fileManager.validData()) {
serverArray.push (new NoteObject( "McDonald", "Fast Food", "3239 156th Ave SE, Bellevue, WA 98007", "5 Stars", "https://www.mcdonalds.com/us/en-us.html" ));
serverArray.push (new NoteObject( "Rain Cafe", "Cafe", "13200 Aurora Ave N suite c, Seattle, WA 98133", "4 Stars", "https://www.orderraincafe.com/"));
serverArray.push (new NoteObject( "El Gran Taco", "Food Truck", "Seattle, WA 98122", "5 Stars", "https://elgrantacoseattle.com/home.php"));
fileManager.write(); 
}
else {
  fileManager.read(); // do have prior restaurants so load up the array
}
console.log(serverArray);

/*GET home page */
router.get('/', function(req, res, next){
  res.sendFile('index.html');
});

/* GET all Restaurant data */
router.get('/getAllRestaurants', function(req, res) {
  fileManager.read();
  res.status(200).json(serverArray);
 }); 

 /* Add one new restaurant */
router.post('/AddRestaurant', function(req, res) {
  const newRestaurant = req.body;
  serverArray.push(newRestaurant);
  fileManager.write();
  res.status(200).json(newRestaurant);
 }); 

// add route for delete
router.delete('/DeleteRestaurant/:ID', (req, res) => {
  const delID = req.params.ID;
  let found = false;
  let pointer = GetObjectPointer(delID);
  if(pointer == -1){ // if did not find restaurant in array
    console.log("not found");
    return res.status(500).json({
        status: "error - no such ID"
      });
  }
  else { // if did find the movie
      serverArray.splice(pointer, 1); // remove 1 element at index
      fileManager.write();
      res.send('Restaurant with ID: ' + delID + ' deleted!');
    }
  });

  // cycles thru the array to find the array element with a matching ID
function GetObjectPointer(whichID) {
  for (let i = 0; i < serverArray.length; i++) {
      if (serverArray[i].ID == whichID ) {
        return i;
        }
      }
  return -1; // flag to say did not find a restaurant
  }


module.exports = router;
