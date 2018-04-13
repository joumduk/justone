cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-universal-clipboard.Clipboard",
    "file": "plugins/cordova-universal-clipboard/www/clipboard.js",
    "pluginId": "cordova-universal-clipboard",
    "clobbers": [
      "cordova.plugins.clipboard"
    ]
  },
  {
    "id": "cordova-instagram-plugin.InstagramPlugin",
    "file": "plugins/cordova-instagram-plugin/www/CDVInstagramPlugin.js",
    "pluginId": "cordova-instagram-plugin",
    "clobbers": [
      "Instagram"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-universal-clipboard": "0.1.0",
  "cordova-instagram-plugin": "0.5.6"
};
// BOTTOM OF METADATA
});