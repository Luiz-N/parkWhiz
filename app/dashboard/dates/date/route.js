import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    // let cachedDate = this.store.peekRecord('params.date_id');

    let date = this.store.find('date', params.date_id);
    return date
      .then(function(date){
        let spots = date.get('spots')
        if (!!spots) {
          return spots;
        }
        let spotUrl = date.get('url');
        return new Ember.RSVP.Promise(function(resolve) {
          d3.csv(spotUrl+"?v="+Math.random(), function(err, data) {
            resolve(data);
          })
        });
      }).then(function(data) {
        date.set('spots', data);
        return date;
      })
  },

  actions: {
    loading(transition) {
      let controller = this.controllerFor('dashboard.dates.date');
      controller.set('currentlyLoading', true);
      transition.promise.finally(function() {
          controller.set('currentlyLoading', false);
      });
    }
  }
});
