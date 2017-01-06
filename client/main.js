import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.posts.helpers({
  list: function(){return Post.find();}
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

Template.postForm.events({
  "click button": function(e, t) {
    var data;
    data = t.find("#content");
    Post.insert({
      content: data.value
    });
    // return data.value = "";
    FlowRouter.redirect("/list");
  }
});

Template.one.events({
  "click #delete": function(e, t) {
    var post;
    post = Post.findOne(t.data);
    return Post.remove({
      _id: post._id
    });
  }
});

Template.post.editing = function() {
  return Session.get("target" + this._id);
};

Template.post.events({
  "click #edit": function(e, t) {
    return Session.set("target" + t.data._id, true);
  },
  "keypress input": function(e, t) {
    var post;
    if (e.keyCode === 13) {
      post = Post.findOne(t.data);
      Post.update({
        _id: post._id
      }, {
        $set: {
          content: e.currentTarget.value
        }
      });
      return Session.set("target" + t.data._id, false);
    }
  }
});
