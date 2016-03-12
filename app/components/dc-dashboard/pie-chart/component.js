import Ember from 'ember';

export default Ember.Component.extend({

  dimension: null,
  group: null,
  width: 500,
  height: 200,
  data: null,

  // id: Ember.computed('code', function() {
  //   return this.get('code') + "countWidget";
  // }),

  draw: Ember.on('didRender', function() {

    this.set('width', this.$().parent().parent().outerWidth());
    this.set('height', this.$().parent().parent().outerWidth()/3);

    let pieChart = dc.pieChart("#"+this.get('id'));
      pieChart
        .width(this.get('width'))
        .height(this.get('height'))
        .dimension(this.get('dimension'))
        .group(this.get('dimension').group())
        .colors(this.get('colors'))
        .colorAccessor(function(d, i){
          return i === 0 ? 1 : 0;
        })
  })

});
