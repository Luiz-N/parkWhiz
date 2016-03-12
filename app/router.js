import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dashboard', {path: '/'}, function() {
    this.route('dates', function() {
      this.route('date', { path: '/:date_id' });
    });
  });
});

export default Router;
