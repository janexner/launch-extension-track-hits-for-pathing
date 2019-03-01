'use strict';

var variableName = turbine.getExtensionSettings().prop;
var contextDataVariable = turbine.getExtensionSettings().contextDataVariable;
try {
  turbine.logger.info('Using ' + variableName + "/" + contextDataVariable);
} catch(e) {}

var getTracker = turbine.getSharedModule("adobe-analytics","get-tracker");

getTracker().then( function(s) {
  if (s) {
    var callOriginalDoPlugins = false;
    if ('function' === typeof s.doPlugins) {
      s.doPluginsOriginal = s.doPlugins;
      callOriginalDoPlugins = true;
    }
    s.usePlugins = true;
    var newDoPlugins = function(s) {
      // set prop
      if ('d' === s.linkType || 'e' === s.linkType || 'o' === s.linkType) {
        var val;
        if (s.linkName) {
          val = s.linkName;
        } else if ('d' === s.linkType) {
          val = "Download Link";
        } else if ('e' === s.linkType) {
          val = "Exit Link";
        }
        if ('undefined' !== variableName && variableName) {
          s[variableName] = val;
          s.linkTrackVars = s.linkTrackVars ? s.linkTrackVars + ',' : '';
          s.linkTrackVars = s.linkTrackVars + variableName;
        }
        if ('undefined' !== contextDataVariable && contextDataVariable) {
          s['contextData'][contextDataVariable] = val;
        }
      } else {
        var val = "D=pageName";
        if ('undefined' !== variableName && variableName) {
          s[variableName] = val;
        }
        if ('undefined' !== contextDataVariable && contextDataVariable) {
          s['contextData'][contextDataVariable] = val;
        }
      }
      if (callOriginalDoPlugins) {
        // call original doPlugins, too
        s.doPluginsOriginal.call(this, s);
      }
    }
    s.doPlugins = newDoPlugins;
  } else {
    turbine.logger.warn('No Analytics tracker found');
  }
});

module.exports = function(settings) {
  // nothing TODO here
};
