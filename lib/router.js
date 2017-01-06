FlowRouter.route('/', {
    action: function() {
      BlazeLayout.render('welcome');
    }
});

FlowRouter.route('/list', {
    action: function() {
      BlazeLayout.render('posts');
      name: "list"
    }
});

FlowRouter.route('/list/add', {
    action: function() {
      BlazeLayout.render('postForm');
    }
});
FlowRouter.route('/list/:value',{
  action: function(params) {
    var post = Post.findOne({ content: params.value });
    BlazeLayout.render('one', {data: post});

  }
})
