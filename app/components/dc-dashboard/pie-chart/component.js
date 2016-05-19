import Ember from 'ember';

export default Ember.Component.extend({

  dimension: null,
  group: null,
  width: 500,
  height: 200,
  data: null,
  // colors: ['rgba(1,112,223,.4)', 'rgba(255,0,0,.4)', 'green'],
  colors: ['black', 'rgba(255,0,0,.4)', 'rgba(1,112,223,.4)'],

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
        .label(function(d,i) {
          return d.data.key === "both" ? "shared *" : d.data.key;
        })
        .valueAccessor(function(d,i) {
          return d.key === "both" ? d.value/2 : d.value;
        })
        // .on('postRender', function(chart) {
        //   let svg = chart.svg()[0][0]
        //   let t = textures.lines()
        //     .orientation("diagonal")
        //     .size(40)
        //     .strokeWidth(26)
        //     .stroke("darkorange")
        //     .background("firebrick");
          // d3.select(svg).call(t)
          // d3.select('.pie-slice._0 path').style('fill', t.url())
          // let sharedSlice = chart.selectAll('.pie-slice._0 path')[0][0];
          // $(sharedSlice).css('fill', t.url())
          // console.log(t.url())
        // })
        // .on('postRender', function(chart) {
        //   debugger;
        // })
        // .colorAccessor(function(d, i){
        //   return i === 0 ? 1 : 0;
        // })
  })

});
