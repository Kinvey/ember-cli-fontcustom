# Ember-cli-fontcustom

Tired of searching for a Font Awesome icon that kinda sorta works? Custom webfonts, ftw! Just drop SVGs into a folder, and voila, you've got a custom web icon font.

## Installation

```shell
$ npm install --save ember-cli-fontcustom
```

In your `Brocfile.js`:

```js
var app = new EmberApp({
  // Configuration is done through these options. Defaults are shown below
  icons: {
    // a path to your folder of svgs, or a Broccoli tree
    svgSources: 'app/styles/icons', 
    // a path to the CSS template
    cssTemplate: // A default, bootstrap based template is bundled with this addon
    // the destination folder in your built app output
    dest: 'assets'
  }
});
```

### Note

You must have installed `fontcustom` to be able to use this addon. Check installation guide [there](https://github.com/FontCustom/fontcustom).
