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
      this.iconFontName = app.options.icons.fontName;
      this.iconNoHash = app.options.icons.noHash;
      this.includeTemplate = app.options.icons.includeTemplate;

      this.iconDestPath = this.iconOutput ?
        path.join('assets', this.iconOutput) :
        'assets';
    }
    // Store appRoot so fontcustom can find the icon sources
    this.appRoot = app.project.root;

    this._super.included.apply(this, arguments);
  },

  contentFor: function(type) {
    if (type === 'head' && this.includeTemplate !== false) {
      return '<link rel="stylesheet" href="' + this.iconDestPath + '/icons.css">';
    }
  },

  // Build font files
  // TODO this isn't ideal - icons.css should be included in my SCSS/LESS build
  treeForPublic: function(tree) {
    var svgSources = this.svgSources || path.join('app', 'styles', 'icons');
    if (typeof svgSources === 'string') {
      svgSources = path.join(this.appRoot, svgSources);
    }
    var templatePath = this.iconCSSTemplate ?
      path.join(this.appRoot, this.iconCSSTemplate) :
      path.join(__dirname, 'addon', 'icons.css');

    var fontTree = fontcustom(svgSources, {
      output: this.iconDestPath,
      templates: [ templatePath ],
      'font-name': this.iconFontName,
      'no-hash': this.iconNoHash
    });
    return mergeTrees([ tree, fontTree ]);
  }
};
