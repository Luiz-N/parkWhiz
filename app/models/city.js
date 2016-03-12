import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  hub: DS.attr('string'),
  code: DS.attr('string'),
  days: DS.hasMany('day'),
  lastUpdate: DS.attr('date'),

  spotHeroRawData: DS.attr(),
  parkWhizRawData: DS.attr(),
  spotHeroSpots: DS.attr(),
  parkWhizSpots: DS.attr(),

  previousDays: DS.attr(),

  updatePreviousDays: Ember.observer('lastUpdate', function() {
    let lastUpdate = this.get('lastUpdate');
    // debugger;
    let previousDays = this.get('previousDays') || [];
    let lastDate = previousDays.length ? previousDays[previousDays.length - 1].date : null;
    if (lastDate && (new Date(lastDate)).toDateString() != lastUpdate.toDateString()) {
      previousDays.push({
        date: lastUpdate,
        spotCount: this.get('spotHeroSpots.length'),
        whizCount: this.get('parkWhizSpots.length')
      });
      this.set('previousDays', previousDays);
      this.save();
    }
  }),

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
  }),


});
