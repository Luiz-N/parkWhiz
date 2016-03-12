import Ember from 'ember';

export default Ember.Controller.extend({

  currentCity: "Chicago",
  spotHeroUrl: null,
  parkWhizUrl: null,

  cityCoords: {
    Chicago: {hub:2, coords:[41.875848 , -87.625494]},
    NY: {hub:1, coords:[40.712784, -74.005941]},
    SF: {hub:3, coords:[37.774929, -122.419416]},
    Denver: {hub:15, coords:[39.739236, -104.990251]},
    DC: {hub:152, coords:[38.907192, -77.036871]}
  },

  spotHeroRawData: Ember.computed('currentCity', function() {
    let currentCity = this.get('currentCity');
    let cityCoords = this.get('cityCoords');
    let lat = cityCoords[currentCity].coords[0];
    let lon = cityCoords[currentCity].coords[1];

    return Ember.$.getJSON('http://crossorigin.me/http://spothero.com/api/v1/facilities/rates/?latitude='+lat+'&longitude='+lon+'&sort=distance&distance__gt=10&distance__lt=12000');
  }),

  spotHeroParsedData: Ember.computed('spotHeroRawData', function() {
    let rawData = this.get('spotHeroRawData');
    let spots = rawData.data.results;
    return spots.map(
      (spot) => {
        return {
          lat: spot.latitude,
          lon: spot.longitude,
          price: Math.round(spot.highest_price/100)
          // price: +(spot.highest_price/100).toFixed(1)

        };
    });
  }),

  parkWhizRawData: Ember.computed('currentCity', function() {
    let currentCity = this.get('currentCity');
    let cityCoords = this.get('cityCoords');
    let hub = cityCoords[currentCity].hub;

    return Ember.$.get('http://crossorigin.me/http://www.parkwhiz.com/search/table/?f=2&hub_id='+hub)
      .then(function(resp) {
        let firstKeyPos = resp.indexOf("log = ");
        let secondKeyPos = resp.indexOf("</script>");
        let str = resp.slice(firstKeyPos + 6,secondKeyPos-2);
        let jsonObj = eval("(" + str + ")");
        return jsonObj;
      })
  }),

  parkWhizParsedData: Ember.computed('spotHeroRawData', function() {
    let rawData = this.get('parkWhizRawData');
    let spots = rawData.facilities;
    return spots.map(
      (spot) => {
        return {
          lat: spot.lat,
          lon: spot.lng,
          price: spot.price
        };
    });
  }),

  actions: {
    switchCity: function(cityName) {
      this.set('currentCity', cityName);
    }
  }



});
