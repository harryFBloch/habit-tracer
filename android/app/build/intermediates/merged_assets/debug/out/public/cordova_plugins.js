
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-badge.Badge",
          "file": "plugins/cordova-plugin-badge/www/badge.js",
          "pluginId": "cordova-plugin-badge",
        "clobbers": [
          "cordova.plugins.notification.badge"
        ]
        },
      {
          "id": "cordova-plugin-device.device",
          "file": "plugins/cordova-plugin-device/www/device.js",
          "pluginId": "cordova-plugin-device",
        "clobbers": [
          "device"
        ]
        },
      {
          "id": "cc.fovea.cordova.purchase.InAppBillingPlugin",
          "file": "plugins/cc.fovea.cordova.purchase/www/store-android.js",
          "pluginId": "cc.fovea.cordova.purchase",
        "clobbers": [
          "store"
        ]
        },
      {
          "id": "cordova-plugin-streaming-media.StreamingMedia",
          "file": "plugins/cordova-plugin-streaming-media/www/StreamingMedia.js",
          "pluginId": "cordova-plugin-streaming-media",
        "clobbers": [
          "streamingMedia"
        ]
        },
      {
          "id": "com.moust.cordova.videoplayer.VideoPlayer",
          "file": "plugins/com.moust.cordova.videoplayer/www/videoplayer.js",
          "pluginId": "com.moust.cordova.videoplayer",
        "clobbers": [
          "VideoPlayer"
        ]
        },
      {
          "id": "cordova-plugin-inapppurchase.InAppBillingV3",
          "file": "plugins/cordova-plugin-inapppurchase/www/index-android.js",
          "pluginId": "cordova-plugin-inapppurchase",
        "merges": [
          "inAppPurchase"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cc.fovea.cordova.purchase": "10.1.1",
      "cordova-plugin-badge": "0.8.8",
      "cordova-plugin-device": "2.0.3",
      "cordova-plugin-inapppurchase": "1.1.0",
      "cordova-plugin-streaming-media": "2.3.0",
      "com.moust.cordova.videoplayer": "1.0.1"
    };
    // BOTTOM OF METADATA
    });
    