var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require('./models/campgrounds'),
    seedDB = require('./seeds');
Comment = require('./models/comment');

mongoose.connect("mongodb://localhost/yelp_camp/v2");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.get("/", function (req, res) {
  res.render("landing");
  console.log("someone is checking out the landing page");
});

app.get("/campgrounds", function (req, res) {
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

app.post("/campgrounds", function (req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc };
  // Crate a new campground andsave to database
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function (req, res) {
  res.render("campgrounds/new");
});

// Show - shows more info about each campground
app.get("/campgrounds/:id", function (req, res) {
  // Find campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render("campgrounds/show", { campground: foundCampground });
    }
  });
});

// ================
// Comment Routes
// ================

app.get("/campgrounds/:id/comments/new", function (req, res) {
  // find campground by id
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

app.post('/campgrounds/:id/comments', function (req, res) {
  // look up campground using ID
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${ campground._id }`);
        }
      });
    }
  });
});

app.listen(3000, process.env.IP, function () {
  console.log("YelpCamp has started");
});

//# sourceMappingURL=app-compiled.js.map