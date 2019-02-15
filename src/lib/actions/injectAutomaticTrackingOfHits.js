'use strict';

var variableName = turbine.getExtensionSettings().prop;
turbine.logger.info('Using ' + variableName);

var getTracker = turbine.getSharedModule("adobe-analytics","get-tracker");

getTracker().then( function(s) {
  if (s) {
    turbine.logger.info('Making new doPlugins...');
    var callOriginalDoPlugins = false;
    if ('function' === typeof s.doPlugins) {
      s.doPluginsOriginal = s.doPlugins;
      callOriginalDoPlugins = true;
      turbine.logger.info('Stashed original doPlugins.');
    } else {
      turbine.logger.info('No original doPlugins found.');
    }
    turbine.logger.info('Zwischenzeit');
    s.usePlugins = true;
    s_doPlugins = function(s) {
      // set prop
      _satellite.logger.info('Kicking off new doPlugins...')
      if ('d' === s.linkType || 'e' === s.linkType || 'o' === s.linkType) {
        if (s.linkName) {
          s[variableName] = s.linkName;
        } else if ('d' === s.linkType) {
          s[variableName] = "Download Link";
        } else if ('e' === s.linkType) {
          s[variableName] = "Exit Link";
        }
        s.linkTrackVars = s.linkTrackVars ? s.linkTrackVars + ',' : '';
        s.linkTrackVars = s.linkTrackVars + variableName;
      } else {
        s[variableName] = 'D=pageName';
      }
      _satellite.logger.info('Modified s object', s);
      if (callOriginalDoPlugins) {
        // call original doPlugins, too
        _satellite.logger.info('Calling original doPlugins...');
        s.doPluginsOriginal.apply(this, s);
      }
    }
    s.doPlugins = s_doPlugins;
  } else {
    turbine.logger.warn('No Analytics tracker found');
  }
});

module.exports = function(settings) {
  turbine.logger.info('exports called.');
};
