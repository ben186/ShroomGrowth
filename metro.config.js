// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('metro-config')

module.exports = (async () => {
    const defaultConfig = await getDefaultConfig();
    const { assetExts } = defaultConfig.resolver;
    return {
      resolver: {
        assetExts: [...assetExts, 'tflite'],
      }
    };
  })();

// For one idea on how to support symlinks in Expo, see:
// https://github.com/infinitered/ignite/issues/1904#issuecomment-1054535068
