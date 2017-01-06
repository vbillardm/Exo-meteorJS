import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.posts.helpers({
  list: function(){ return Post.find();}
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


Template.post.events({
  "click #edit": function(e,t) {
     var name = e.currentTarget.getAttribute("name");
     var content = document.getElementsByName(name);
     // remove attr
     post = Post.findOne({"content":content[0].value});
     content[0].removeAttribute("readonly");
     // on blur
     content[0].addEventListener("blur", function( event )
     {
         Post.update({
           _id: post._id
         }, {
           $set: {
             content: content[0].value
           }
         });
         content[0].setAttribute("readonly","true");
    }, true);
  }
});
Template.chatForm.events({
  "click #envoyer": function(e, t) {
    var value = document.getElementById("chat").value;
    var post;
     Message.insert({
      message: value,
      createdAt: Date.now()
    }
  );
    return document.getElementById("chat").value= "";
  }
});

Template.chatForm.helpers({
  messages: function()
   { return Message.find({},{sort:{"createdAt":-1}},{limit:10});}
});
