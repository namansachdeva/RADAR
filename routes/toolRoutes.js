'use strict';
module.exports = function(app) {
  var toolObj = require('../controllers/toolController');


  // Routes
  app.route('/')
    .get(toolObj.show_dashboard);

  // app.route('/tasks/:taskId')
  //   .get(toolObj.read_a_task)
  //   .post(toolObj.delete_a_task);
};