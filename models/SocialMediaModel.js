'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SocialMediaSchema = new Schema({
    name: String,
    likes: [ {
      noOfLikes : Number,
      created_date : {
        type: Date,
        default: Date.now
      }
    }
    ],
    followers: [ {
      noOfFollowers : Number,
      created_date : {
        type: Date,
        default: Date.now
      }
    }
    ],
    swiggylikes: [ {
      noOfLikes : Number,
      created_date : {
        type: Date,
        default: Date.now
      }
    }
    ],
    foodpandalikes: [ {
      noOfLikes : Number,
      created_date : {
        type: Date,
        default: Date.now
      }
    }
    ],
});

module.exports = mongoose.model('SocialMedia', SocialMediaSchema);