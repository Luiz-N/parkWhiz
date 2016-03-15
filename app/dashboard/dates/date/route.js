import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel (p) {
    let tag = p.state.queryParams.t;
    if (tag) {
      ga('send', 'event', 'taggedViewer', tag);
    }
  },

  model(params) {
    // let cachedDate = this.store.peekRecord('params.date_id');

    let date = this.store.find('date', params.date_id);
    return date
      .then(function(date){
        let spots = date.get('spots')
        let spotUrl = date.get('url');
        return new Ember.RSVP.Promise(function(resolve) {
          let d = new Date();
          let val = d.setMinutes(0,0,0);
          d3.csv(spotUrl+"?v="+val, function(err, data) {
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
