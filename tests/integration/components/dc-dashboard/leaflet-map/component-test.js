import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dc-dashboard/leaflet-map', 'Integration | Component | dc dashboard/leaflet map', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dc-dashboard/leaflet-map}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dc-dashboard/leaflet-map}}
      template block text
    {{/dc-dashboard/leaflet-map}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
