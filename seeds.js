var mongoose = require('mongoose');
var Campground = require('./models/campgrounds');
var Comment = require('./models/comment');

var data = [

  { name: "Clouds Rest",
	image: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/OHUZL4GT6P.jpg",
  	description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the " +
		"industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled " +
		"it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic " +
		"typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets " +
		"containing Lorem Ipsum passages"
  },
  { name: "Clouds Rest",
	image: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/OHUZL4GT6P.jpg",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the " +
		"industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled " +
		"it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic " +
		"typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets " +
		"containing Lorem Ipsum passages"
  },
  { name: "Clouds Rest",
	image: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/OHUZL4GT6P.jpg",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the " +
		"industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled " +
		"it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic " +
		"typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets " +
		"containing Lorem Ipsum passages"
  },
  { name: "Clouds Rest",
	image: "https://snap-photos.s3.amazonaws.com/img-thumbs/960w/OHUZL4GT6P.jpg",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the " +
		"industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled " +
		"it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic " +
		"typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets " +
		"containing Lorem Ipsum passages"
  }
];

function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, function (err) {
	if (err) {
	  console.log(err)
	}

	console.log("removed campgrounds");
	
	// add a few campgrounds
	data.forEach(function(seed) {
	  Campground.create(seed, function(err, campground) {
		if(err) {
		  console.log(err)
		} else {
		  console.log("added a campground");
		  
		  // create a comment on each campground
		  Comment.create(
			{
			  text: "This is place is great!",
			  author: "Homer"
			}, function(err, comment) {
			  if (err) {
				console.log(err)
			  } else {
				campground.comments.push(comment);
				campground.save();
				console.log("Created a new comment")
			  }
			}
		  )
		}
	  })
	})
  });



}

module.exports = seedDB;