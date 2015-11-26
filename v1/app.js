var express = require("express");
var app = express();

app.set("view engine", "ejs");


app.get("/", function(req, res) {
    res.render("landing");
})

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        {name: "Salmon Creek", image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRjj0VfmU-j0DDIyl7Hgi-F3VnU3_NSCRYPgSjIjPwADixTpmp6Cw"},
        {name: "Whiteowl",     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTho-MJjrSRxKeH1TlqiBwvCaV7MSRZvYVCVlV6HmPaabxFNDnj"},
        {name: "Randys Camp",  image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTF-Gyyb4kT5Pz1oIZlnPctqqtGjTiXNCX1IpWZqSiV0XoZ9L6jUw"}
        ]
        
        res.render("campgrounds", {campgrounds:campgrounds});        
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp has started");
});