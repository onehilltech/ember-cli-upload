/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  addons: [
    { name: '@ember/render-modifiers' },
    { name: 'ember-cli-custom-properties' }
  ]
});
