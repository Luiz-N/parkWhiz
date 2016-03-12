import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dc-dashboard/dual-histogram', 'Integration | Component | dc dashboard/dual histogram', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dc-dashboard/dual-histogram}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dc-dashboard/dual-histogram}}
      template block text
    {{/dc-dashboard/dual-histogram}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
