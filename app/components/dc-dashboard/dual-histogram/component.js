import Ember from 'ember';

export default Ember.Component.extend({

  dimension: null,
  group1: null,
  group2: null,
  // classNames: ["col-md-12"],

  // colors: ['rgba(160,190,135,.75)','rgba(160,190,135,.9)', 'rgba(231,138,195,.5)','rgba(231,138,195,.8)', 'rgba(166,216,84,.5)','rgba(166,216,84,.8)', 'rgba(64,64,64,.5)','rgba(64,64,64,.8)', 'black'],

  // lineColors: ["rgba(232,177,114,0.5)", "rgba(128,222,195,0.5)", "rgba(203,188,220,0.5)", "rgba(193,221,121,0.5)"],

  draw: Ember.on('didRender', function() {

    this.set('width', this.$().parent().parent().outerWidth());
    this.set('height', this.$().parent().parent().outerWidth()/3);


    let compositeChart  = dc.compositeChart("#"+this.get('id'));
    let group1 = dc.barChart(compositeChart);
    let group2 = dc.barChart(compositeChart);

    let charts = [];


    group1
      .group(this.get('group1'))
      .dimension(this.get('dimension'))
      .x(d3.scale.linear())
      .colors([this.get('colors')[0]])
      // .gap(1)
      .xUnits(dc.units.integers)
      .centerBar(true)
      .title(function(d) {
        return 'SpotHero';
      })
      .valueAccessor(function(d) {
        return d.value.median ? d.value.median : d.value.count;
      })


    group2
      .group(this.get('group2'))
      .dimension(this.get('dimension'))
      .x(d3.scale.linear())
      .colors([this.get('colors')[1]])
      // .gap(1)
      .xUnits(dc.units.integers)
      .centerBar(true)
      .title(function(d) {
        return 'ParkWhiz';
      })
      .valueAccessor(function(d) {
        return d.value.median ? d.value.median : d.value.count;
      })

      charts.push(group1);
      charts.push(group2);

    compositeChart
      .renderHorizontalGridLines(true)
      .brushOn(true)
      .width(this.get('width'))
      .height(this.get('height'))
      .dimension(this.get('dimension'))
      .x(d3.scale.linear())
      .xUnits(dc.units.integers)
      // .y(d3.scale.linear().domain([0,max]))
      .elasticX(true)
      .elasticY(true)
      .xAxisPadding(1)
      .margins({top: 0, right: 30, bottom: 35, left: 40})
      // .legend(dc.legend().x(60).y(10).itemHeight(13))
      .yAxisLabel(this.get('yLabel'))
      // .yAxisLabel("# of Locations")
      .xAxisLabel(this.get('xLabel'))
      .compose(charts)
      .on('postRender', function(chart) {
        chart.redraw()
        let whizSpots = chart.selectAll('.sub._1 rect');
        whizSpots[0].forEach(function(rect, i) {
          let $r = $(rect);
          let width = $r.attr('width');
            $r
              .css('width', width/2)
              .css('transform', 'translateX('+ width/4 +'px)')
          })
      })
      .on('postRedraw', function(chart) {
        let whizSpots = chart.selectAll('.sub._1 rect');
        whizSpots[0].forEach(function(rect, i) {
          let $r = $(rect);
          let width = $r.attr('width');
          if (!!width) {
            $r
              .attr('width', width/2)
              .attr('transform', 'translate('+ width/4 +')')
          }
        })
      })

      if (this.get('xLabel').indexOf("Hour") != -1) {
        compositeChart
          .xAxis().tickValues([0,2,4,6,8,10,12,14,16,18,20,22])
          .tickFormat(function(v, i) {
            // let units = ["Prep Phase", "Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Presentations"];
            if (v > 12) {
              return v - 12;
            }
            else if (v === 12) {
              return 'noon';
            }
            else if (v === 0) {
              return 'midnight';
            }
            return v;
          })

      }
  })

});
