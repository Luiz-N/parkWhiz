import Ember from 'ember';

export default Ember.Controller.extend({

  noSelectedDate: Ember.computed.equal('target.currentPath', 'dashboard.index'),

  init(x,y,z) {
    Ember.run.schedule("afterRender",this,function() {
      if (this.get('noSelectedDate')) {
        this.transitionToRoute('dashboard.dates.date', 'today');
      }
    });
  },

  actions: {
    switchCity: function(cityName) {
      this.set('currentCity', cityName);
    }
  }



});
