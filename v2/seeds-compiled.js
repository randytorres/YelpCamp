var mongoose = require('mongoose');
var Campground = require('./models/campgrounds');
var Comment = require('./models/comment');

var data = [{ name: "Clouds Rest",
	image: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/OHUZL4GT6P.jpg",
	description: "test"
}, { name: "Clouds Rest",
	image: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/OHUZL4GT6P.jpg",
	description: "test"
}, { name: "Clouds Rest",
	image: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/OHUZL4GT6P.jpg",
	description: "test"
}, { name: "Clouds Rest",
	image: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/OHUZL4GT6P.jpg",
	description: "test"
}];

function seedDB() {
	// Remove all campgrounds
	Campground.remove({}, function (err) {
		if (err) {
			console.log(err);
		}

		console.log("removed campgrounds");

		// add a few campgrounds
		data.forEach(function (seed) {
			Campground.create(seed, function (err, campground) {
				if (err) {
					console.log(err);
				} else {
					console.log("added a campground");

					// create a comment on each campground
					Comment.create({
						text: "This is place is great!",
						author: "Homer"
					}, function (err, comment) {
						if (err) {
							console.log(err);
						} else {
							campground.comments.push(comment);
							campground.save();
							console.log("Created a new comment");
						}
					});
				}
			});
		});
	});
}

module.exports = seedDB;

//# sourceMappingURL=seeds-compiled.js.map