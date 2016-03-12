import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  spots: DS.hasMany('spot'),
  city: DS.belongsTo('city'),

  spotHeroRawData: DS.attr(),
  parkWhizRawData: DS.attr(),
  // spotHeroSpots: DS.attr(),
  // parkWhizSpots: DS.attr(),

  spotHeroSpots: Ember.computed('spotHeroRawData', function() {
    let spots = this.get('spotHeroRawData');
    return spots.map(
      (spot) => {
        return {
          lat: spot.latitude,
          lng: spot.longitude,
          price: Math.round(spot.highest_price/100)
        };
    });
  }),

  parkWhizSpots: Ember.computed('parkWhizRawData', function() {
    let rawData = this.get('parkWhizRawData');
    let spots = rawData.facilities;
    return spots.map(
      (spot) => {
        return {
          lat: spot.lat,
          lng: spot.lng,
          price: Math.round(spot.price)
        };
    });
  })

});
