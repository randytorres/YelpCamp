var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require('passport'),
    LocalStrategy = require('passport-local'),
    Campground    = require('./models/campgrounds'),
    seedDB        = require('./seeds');
    Comment       = require('./models/comment');
    User          = require('./models/user');


mongoose.connect("mongodb://localhost/yelp_camp/v2");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: "Once again Spidey is cool",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
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
      res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
    }
  })
});


app.post("/campgrounds", function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  // Crate a new campground and save to database
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err)
    } else {
      res.redirect("/campgrounds");
    }
  });
});


app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});


// Show - shows more info about each campground
app.get("/campgrounds/:id", function(req, res) {
  // Find campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if(err) {
      console.log(err)
    } else {
      console.log(foundCampground);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});


// ================
// Comment Routes
// ================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
// find campground by id
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

app.post('/campgrounds/:id/comments', isLoggedIn, function(req, res) {
  // look up campground using ID
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds")
    } else {
     Comment.create(req.body.comment, function(err, comment) {
        if(err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${campground._id}`)
        }
      })
    }
  });
});

// AUTH ROUTES
// show register form
app.get("/register", function(req, res) {
  res.render("register");
});

// handle sign up logic
app.post("/register", function(req, res) {
  var newUser = new User({username: req.body.username});
  User.register( newUser, req.body.password, function(err, user) {
    if(err) {
      console.log(err);
      return res.render("register")
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/campgrounds");
    });
  });
});

// Show Login Form
app.get("/login", function(req, res) {
  res.render("login");
});

//handling login logic
app.post("/login", passport.authenticate({
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req, res) {
});

// logic route

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login")
}

app.listen(3000, process.env.IP, function(){
  console.log("YelpCamp has started");
});

