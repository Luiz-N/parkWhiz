import DS from 'ember-data';

export default DS.Model.extend({
  coordID: DS.attr('string'),
  number: DS.attr('string')
});
