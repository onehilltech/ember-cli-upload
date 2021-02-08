'use strict';

module.exports = {
  name: require('./package').name,

  included (app) {
    this._super.included.apply (this, arguments);

    app.import ({
      development: 'node_modules/dropzone/dist/dropzone.css',
      production: 'node_modules/dropzone/dist/min/dropzone.css'
    });

    app.import ({
      development: 'node_modules/dropzone/dist/basic.css',
      production: 'node_modules/dropzone/dist/min/basic.css'
    });
  }
};
