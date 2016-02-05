var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb:://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundsSchema = new Mongoose.Schema({
    name: String,
    image: String
});
//4:31 of video


var campgrounds = [
        {name: "Salmon Creek", image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRjj0VfmU-j0DDIyl7Hgi-F3VnU3_NSCRYPgSjIjPwADixTpmp6Cw"},
        {name: "Whiteowl",     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTho-MJjrSRxKeH1TlqiBwvCaV7MSRZvYVCVlV6HmPaabxFNDnj"},
        {name: "Randys Camp",  image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTF-Gyyb4kT5Pz1oIZlnPctqqtGjTiXNCX1IpWZqSiV0XoZ9L6jUw"},
        {name: "Salmon Creek", image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRjj0VfmU-j0DDIyl7Hgi-F3VnU3_NSCRYPgSjIjPwADixTpmp6Cw"},
        {name: "Whiteowl",     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTho-MJjrSRxKeH1TlqiBwvCaV7MSRZvYVCVlV6HmPaabxFNDnj"},
        {name: "Randys Camp",  image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTF-Gyyb4kT5Pz1oIZlnPctqqtGjTiXNCX1IpWZqSiV0XoZ9L6jUw"},
        {name: "Salmon Creek", image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRjj0VfmU-j0DDIyl7Hgi-F3VnU3_NSCRYPgSjIjPwADixTpmp6Cw"},
        {name: "Whiteowl",     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTho-MJjrSRxKeH1TlqiBwvCaV7MSRZvYVCVlV6HmPaabxFNDnj"},
        {name: "Randys Camp",  image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTF-Gyyb4kT5Pz1oIZlnPctqqtGjTiXNCX1IpWZqSiV0XoZ9L6jUw"},
        {name: "Salmon Creek", image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRjj0VfmU-j0DDIyl7Hgi-F3VnU3_NSCRYPgSjIjPwADixTpmp6Cw"},
        {name: "Whiteowl",     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTho-MJjrSRxKeH1TlqiBwvCaV7MSRZvYVCVlV6HmPaabxFNDnj"},
        {name: "Randys Camp",  image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTF-Gyyb4kT5Pz1oIZlnPctqqtGjTiXNCX1IpWZqSiV0XoZ9L6jUw"}
        ];

app.get("/", function(req, res){
    res.render("landing");
    console.log("someone is checking out the landing page");
});

app.get("/campgrounds", function(req, res){
     res.render("campgrounds", {campgrounds:campgrounds});        
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    // redirect to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp has started");
});

