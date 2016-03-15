import Ember from 'ember';

export default Ember.Route.extend({

  model (p) {
    return true;
  },

  setupController(model, controller, x, y) {
    // debugger;
    // if (x.intent.url.length === 1) {
    //   this.transitionTo('/dates/today')
    // }
  },

  // renderTemplate(controller, model) {
  //   this.render('dashboard')
  // }

});
