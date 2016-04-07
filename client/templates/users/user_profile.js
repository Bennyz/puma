Template.userProfile.helpers({
  fullName: function() {
    return Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName;
  },

  gravatarURL: function() {
    return this.profile.gravatarURL;
  },

  projects: function() {
    return Projects.find({ "owner.userId": Meteor.userId() });
  },

  memberOfProjects: function() {
    return Projects.find({ "members.userId": Meteor.userId() }, { "userId": 1, "username": 1});
  },

  isMemberOf: function() {
    return Template.userProfile.__helpers.get("memberOfProjects")().count() > 0;
  }
});
