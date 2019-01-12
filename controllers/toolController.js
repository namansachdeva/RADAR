'use strict';
var mongoose = require('mongoose'),
  SocialMedia = mongoose.model('SocialMedia');

exports.show_dashboard = function(req, res) {
  // SocialMedia.find({}, function(err, task) {
  //   if (err)
  //     res.send(err);
  //   res.json(task);
  // });

  res.render('index');
};
