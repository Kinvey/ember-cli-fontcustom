'use strict';
var path = require('path');
var fontcustom = require('broccoli-fontcustom');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-fontcustom',
  included: function(app) {
    if (app.options.icons) {
      this.svgSources = app.options.icons.svgSources;
      this.iconCSSTemplate = app.options.icons.cssTemplate;
      this.iconOutput = app.options.icons.dest;
    }
    // Store appRoot so fontcustom can find the icon sources
    this.appRoot = app.project.root;

    this._super.included.apply(this, arguments);
  },

  contentFor: function(type) {
    if (type === 'head') {
      return '<link rel="stylesheet" href="assets/icons.css">';
    }
  },

  // Build font files
  // TODO this isn't ideal - icons.css should be included in my SCSS/LESS build
  treeForPublic: function(tree) {
    var iconDestPath = this.iconDest ?
      path.join('assets', this.iconDest) :
      'assets';
    var svgSources = this.svgSources || path.join('app', 'styles', 'icons');
    if (typeof svgSources === 'string') {
      svgSources = path.join(this.appRoot, svgSources);
    }
    var templatePath = this.iconCSSTemplate ?
      path.join(this.appRoot, this.iconCSSTemplate) :
      path.join(__dirname, 'addon', 'icons.css');

    var fontTree = fontcustom(svgSources, {
      output: iconDestPath,
      templates: [ templatePath ]
    });
    return mergeTrees([ tree, fontTree ]);
  }
};
