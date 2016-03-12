import Ember from 'ember';

export default Ember.Controller.extend({
  currentlyLoading: false,

  // If current path is not heading for a specific recipe then show greeting box.
  // Feels hackish... probably a better way
  // noSelectedRecipe: Ember.computed.equal('target.currentPath', 'recipes.index'),

  actions: {
    search: function(query) {
      // this.send('refreshModel');
      // ga('send', 'event', 'query', 'new search', this.get('q'));
    },
    toggleLoading: function(boolean) {
      debugger;
      this.set('currentlyLoading', boolean)
    }
  }
});
