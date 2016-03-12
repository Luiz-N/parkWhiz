import Ember from 'ember';
// import features from '../chicago_zips.json'

export default Ember.Component.extend( {

  dimension: null,
  group: null,
  width: 700,
  height: 1200,
  topojson: null,
  data: null,

  // geojson: Ember.computed('init', function() {
  //   return Ember.$.getJSON('data/chicago_zips.geojson');
  // }),

  draw: Ember.on('didInsertElement', function() {



    let geoChart = dc.geoChoroplethChart("#"+this.get('id'))
      .width(this.get('width'))
      .height(this.get('height'))
      .colors(d3.scale.linear().range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
      // .colorDomain([0, 45])
      .colorDomain(function() {
         return [dc.utils.groupMin(this.group(), this.valueAccessor()),
          dc.utils.groupMax(this.group(), this.valueAccessor())];
      })
      .dimension(this.get('dimension'))
      .group(this.get('group'))
      .colorCalculator(function (d) { return d ? geoChart.colors()(d) : '#ccc'; })
      .title(function(d) {
        return d.key + " " + d.value;
      })
    // Ember.$.getJSON('https://googledrive.com/host/0B9jw0MX1C_D_ektXOFdTWTJwb00').then(function(cityZips) {
      Ember.$.getJSON('data/downtown_chicago_zips.geojson').then(function(cityZips) {

      var center = d3.geo.centroid(cityZips);
      var projection = d3.geo.mercator().center(center).scale(10);
      var path = d3.geo.path().projection(projection);
      var bounds = path.bounds(cityZips);

      var vscale = 10 * geoChart.height() / (bounds[1][1] - bounds[0][1]);
      var hscale = 10 * geoChart.width() / (bounds[1][0] - bounds[0][0]);
      var scale = (vscale < hscale) ? vscale : hscale;
      projection = d3.geo.mercator().center(center).scale(scale).translate([geoChart.width()*1.35, geoChart.height()*-2.75]);
      // .translate([geoChart.width()+200, -100])

      geoChart
        .overlayGeoJson(cityZips.features, "zip", function (d) {
          return String(d.properties.zip);
        })
        .projection(projection)
        .render()

    })
  })
});
