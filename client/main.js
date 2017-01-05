import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Template.list.helpers({
  players: function()
  {
    // players.insert({ "id":4, "name":"vico" });
    return players.find();
  }
});

Template.posts.helpers({
  list: function(){return Post.find();}
});

Template.postForm.events({
  "click button": function(e, t) {
    var data;
    data = t.find("#content");
    Post.insert({
      content: data.value
    });
    return data.value = "";
  }
});

Template.post.events({
  "click #delete": function(e, t) {
    var post;
    post = Post.findOne(t.data);
    return Post.remove({
      _id: post._id
    });
  }
});
