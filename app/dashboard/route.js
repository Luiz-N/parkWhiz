import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel (p) {
    let tag = p.state.queryParams.t;
    if (tag) {
      ga('send', 'event', 'taggedViewer', tag);
    }
  },

  model (p) {
    return true;
  },


  // renderTemplate(controller, model) {
  //   this.render('dashboard')
  // }

});
