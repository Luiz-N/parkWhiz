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
      // let ary = transition.intent.url.split('/')
      // let date = ary.length ? ary[ary.length -1].split("?")[0] : 'none';
      // ga('send', 'event', 'loading', date);
      transition.promise.finally(function() {
          controller.set('currentlyLoading', false);
      });
    }
  }
});
