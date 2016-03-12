import Ember from 'ember';

export default Ember.Component.extend({

  dimension: null,
  group1: null,
  group2: null,
  // classNames: ["col-md-12"],

  colors: ['rgba(160,190,135,.75)','rgba(160,190,135,.9)', 'rgba(231,138,195,.5)','rgba(231,138,195,.8)', 'rgba(166,216,84,.5)','rgba(166,216,84,.8)', 'rgba(64,64,64,.5)','rgba(64,64,64,.8)', 'black'],

  lineColors: ["rgba(232,177,114,0.5)", "rgba(128,222,195,0.5)", "rgba(203,188,220,0.5)", "rgba(193,221,121,0.5)"],

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
      .x(d3.scale.ordinal())
      .xUnits(dc.units.ordinal)
      .y(d3.scale.linear())
      .colors([this.get('colors')[0]])
      .title(function(d) {
        return d.data.value.median ? d.data.value.median : d.data.value.count;
      })
      // .elasticY(true)
      // .centerBar(true)
      // .ordering(function(d) {return  -d.value.median; })
      // .yAxisLabel("# of Spots")
      // .xAxisLabel("Prices")
      .valueAccessor(function(d) {
        return d.value.median ? d.value.median : d.value.count;
      })
      .gap(15)


    group2
      .group(this.get('group2'))
      .dimension(this.get('dimension'))
      .x(d3.scale.ordinal())
      .xUnits(dc.units.ordinal)
      .y(d3.scale.linear())
      .colors([this.get('colors')[1]])
      .title(function(d) {
        return d.data.value.median ? d.data.value.median : d.data.value.count;
      })
      // .elasticY(true)
      // .centerBar(true)
      // .ordering(function(d) {return  -d.value.median; })
      // .yAxisLabel("# of Spots")
      // .xAxisLabel("Prices")
      .valueAccessor(function(d) {
        return d.value.median ? d.value.median : d.value.count;
      })
      .gap(15)
      // debugger;

      // let group1Max = dc.utils.groupMax(group1.group(), group1.valueAccessor());
      // let group2Max = dc.utils.groupMax(group2.group(), group2.valueAccessor());
      // let max = group1Max > group2Max ? group1Max : group2Max;

      charts.push(group1);
      charts.push(group2);

    compositeChart
      .renderHorizontalGridLines(true)
      .group(this.get('dimension').group())
      .width(this.get('width'))
      .height(this.get('height'))
      .dimension(this.get('dimension'))
      .x(d3.scale.ordinal())
      .xUnits(dc.units.ordinal)
      .yAxisLabel(this.get('yLabel'))
      // .y(d3.scale.linear().domain([0,max]))
      .margins({top: 10, right: 50, bottom: 20, left: 55})
      .elasticY(true)
      // .elasticX(true)
      // .xAxisPadding(1)
      // .legend(dc.legend().x(60).y(10).itemHeight(13))
      .ordering(function(d) {return -d.value; })
      .compose(charts)
        // $(chart.anchor() + ' .dc-legend').remove();
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
  })

});
