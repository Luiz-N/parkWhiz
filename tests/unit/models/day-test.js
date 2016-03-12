import { moduleForModel, test } from 'ember-qunit';

moduleForModel('day', 'Unit | Model | day', {
  // Specify the other units that are required for this test.
  needs: ['model:spot', 'model:city']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
