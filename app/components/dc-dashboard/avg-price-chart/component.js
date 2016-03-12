import Ember from 'ember';

export default Ember.Component.extend({

  dimension: null,
  group: null,
  width: 500,
  height: 200,
  data: null,

  draw: Ember.on('didRender', function() {

    let barChart = dc.barChart("#"+this.get('id'));
      barChart
        .width(this.get('width'))
        .height(this.get('height'))
        // .brushOn(true)
        .renderHorizontalGridLines(true)
        .group(this.get('group'))
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordering(function(d) {return  -d.value.avg; })
        // .stack(this.get('group'), "Gap", function(d) {
        //   return Math.abs(d.value.gap);
        // })
        .valueAccessor(function(d) {
          return +(d.value.avg).toFixed(1);
          // +p.totalHours.toFixed(1);
        })
        // .colorAccessor(function(d, i) {
        //   return i;
        // })
        // .title(function(d) {
        //   let gap = d.data.value.gap;
        //   let totalHours = +(d.data.value.totalHours).toFixed(1);
        //   let name = d.data.key || d.data.value.key;
        //   // negative gap means above median
        //   if (gap < 0) {
        //     return totalHours + " hours of " + name + " (" + -1*gap + " above median)";
        //   }
        //   else {
        //     return totalHours + " hours of " + name + " (" + gap + " below median)";
        //   }
        // })
        .dimension(this.get('dimension'))
        .y(d3.scale.linear())
        .centerBar(true)
        // .margins({top: 0, right: 50, bottom: 20, left: 150})
        .elasticX(true)
        .xAxisPadding('5%')
        // .yAxisLabel("Hours")
        // .colors(this.get('colors'))
        // .ordering(function(d) {return  -d.value.price; })
        .elasticY(true)
        .gap(5)
  })
});
