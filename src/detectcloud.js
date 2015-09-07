function isCloudPebble() {
  if (!Pebble.getActiveWatchInfo) {
    console.log('Not cloudpebble because it always has getActiveWatchInfo');
    return false;
  }
  try {
    var watchInfo = Pebble.getActiveWatchInfo();
    if (watchInfo.model.indexOf('qemu') != -1) {
      console.log('Running under qemu, must be cloudpebble: ' + JSON.stringify(watchInfo));
      return true;
    } else {
      console.log('Not cloudpebble, running on ' + JSON.stringify(watchInfo));
      return false;
    }
  } catch (e) {
    console.log('Found cloudpebble because of an error: ' + e);
    return true;
  }
}

this.exports.isCloudPebble = isCloudPebble;