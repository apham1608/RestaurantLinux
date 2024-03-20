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

serverArray.push (new NoteObject( "McDonald", "Fast Food", "3239 156th Ave SE, Bellevue, WA 98007", "5 Stars", "https://www.mcdonalds.com/us/en-us.html" ));
serverArray.push (new NoteObject( "Rain Cafe", "Cafe", "13200 Aurora Ave N suite c, Seattle, WA 98133", "4 Stars", "https://www.orderraincafe.com/"));
serverArray.push (new NoteObject( "El Gran Taco", "Food Truck", "Seattle, WA 98122", "5 Stars", "https://elgrantacoseattle.com/home.php"));

console.log(serverArray);

/*GET home page */
router.get('/', function(req, res, next){
  res.sendFile('index.html');
});

/* GET all Restaurant data */
router.get('/getAllRestaurants', function(req, res) {
  res.status(200).json(serverArray);
 }); 

module.exports = router;
