Template.register.onCreated(function() {
  this.errors = new ReactiveVar();
  this.errors.set([])

  this.formValid = new ReactiveVar();
  this.formValid.set(false);

  this.user = new ReactiveVar();
  this.user.set({});

  this.formChanged = new ReactiveVar();
  this.formChanged.set(false);

  this.getUserDetails = function() {
    var user = {
      email: $('#inputEmail').val(),
      password: $('#inputPassword').val(),
      username: $('#inputUsername').val(),
      profile: {
        firstName: $('#inputFirstName').val(),
        lastName: $('#inputLastName').val()
      }
    };

    return user;
  }
});

Template.register.helpers({
  errorList: function() {
    return Template.instance().errors.get();
  },

  formInvalid: function(user) {
    if (Template.instance().formChanged.get()) {
      var user = Template.instance().user.get();
      var isValid = (!$.isEmptyObject(user.username) &&
                      !$.isEmptyObject(user.profile.firstName) &&
                      !$.isEmptyObject(user.profile.lastName) &&
                      !$.isEmptyObject(user.email) &&
                      !$.isEmptyObject(user.password));
      Template.instance().formValid.set(isValid);
      return !Template.instance().formValid.get();
    }

    return true;
  }
});

Template.register.events({
  'keyup .form-signup': function(e, template) {
    user = template.getUserDetails();
    template.user.set(user);
    template.formChanged.set(true);
  },

  'submit .form-signup': function(e, template) {
    e.preventDefault();
    var user = template.getUserDetails();

    Accounts.createUser(user, function(err) {
      if (err) {
        console.log(err);
        var errors = [];
        errors.push({message: err.reason});
        template.errors.set(errors);
      } else {
        console.log('User with id: ' + Meteor.userId() + ' added successfully');
        Router.go('projects');
      }
    });
  }
});