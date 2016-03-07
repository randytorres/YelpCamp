var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

//4:31 of video
var Campground = mongoose.model("Campground", campgroundSchema);

  Campground.create(
    {

      name : "Salmon Creek",
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRjj0VfmU-j0DDIyl7Hgi-F3VnU3_NSCRYPgSjIjPwADixTpmp6Cw"

    }, function(err, campground) {
         if(err) {
           console.log(err);
         } else {
           console.log("Newly Created Campground")
           console.log(campground)
         }

    });

app.get("/", function(req, res){
    res.render("landing");
    console.log("someone is checking out the landing page");
});

app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err)
    } else {
      res.render("campgrounds", {campgrounds:allCampgrounds});
    }
  })
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    // Crate a new campground andsave to database
    Campground.create(newCampground, function(err, newlyCreated) {
      if (err) {
        console.log(err)
      } else {
        res.redirect("/campgrounds");
      }
    });
  });

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(3000, process.env.IP, function(){
    console.log("YelpCamp has started");
});

