var mongoose = require('mongoose');
var Campground = require('./models/campgrounds');
var Comment = require('./models/comment');

var data = [

  { name: "Clouds Rest",
	image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjKssHZuLrLAhVC2mMKHWjfBxsQjRwIBw&url=http%3A%2F%2Fwww.fs.usda.gov%2Factivity%2Fipnf%2Frecreation%2Fcamping-cabins%2F%3Frecid%3D6762%26actid%3D29&psig=AFQjCNHJptMzejhUHvt9yrYrOTYaU2U-xw&ust=1457847867492034',
  	description: "Yadayadayada"
  },
  { name: "Clouds Rest",
	image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjKssHZuLrLAhVC2mMKHWjfBxsQjRwIBw&url=http%3A%2F%2Fwww.fs.usda.gov%2Factivity%2Fipnf%2Frecreation%2Fcamping-cabins%2F%3Frecid%3D6762%26actid%3D29&psig=AFQjCNHJptMzejhUHvt9yrYrOTYaU2U-xw&ust=1457847867492034',
  	description: "Yadayadayada"
  },
  { name: "Clouds Rest",
	image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjKssHZuLrLAhVC2mMKHWjfBxsQjRwIBw&url=http%3A%2F%2Fwww.fs.usda.gov%2Factivity%2Fipnf%2Frecreation%2Fcamping-cabins%2F%3Frecid%3D6762%26actid%3D29&psig=AFQjCNHJptMzejhUHvt9yrYrOTYaU2U-xw&ust=1457847867492034',
  	description: "Yadayadayada"
  },
  { name: "Clouds Rest",
	image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjKssHZuLrLAhVC2mMKHWjfBxsQjRwIBw&url=http%3A%2F%2Fwww.fs.usda.gov%2Factivity%2Fipnf%2Frecreation%2Fcamping-cabins%2F%3Frecid%3D6762%26actid%3D29&psig=AFQjCNHJptMzejhUHvt9yrYrOTYaU2U-xw&ust=1457847867492034',
  	description: "Yadayadayada"
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