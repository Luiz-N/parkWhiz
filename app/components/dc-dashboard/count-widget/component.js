import Ember from 'ember';

export default Ember.Component.extend({

  dimension: null,
  group: null,
  width: 500,
  height: 200,
  data: null,

  id: Ember.computed('code', function() {
    return this.get('code') + "countWidget";
  }),

  draw: Ember.on('didRender', function() {

    // this.set('width', $(".half-screen").outerWidth());
    // this.set('height', $(".half-screen").outerWidth()/3);

    let dataCount = dc.dataCount("#"+this.get('id'));
      dataCount
        // .width(this.get('width'))
        // .height(this.get('height'))
        .dimension(this.get('dimension'))
        .group(this.get('group'))
  })

});
