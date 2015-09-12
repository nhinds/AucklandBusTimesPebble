var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');
var config = require('config');
var api = require('api/maxx');

var CONFIG_VERSION = 1;

var foregroundCard;

function loadConfigFromLocalStorage() {
  var persistedConfig = localStorage.getItem('config');
  if (persistedConfig) {
    var deserialisedConfig = JSON.parse(persistedConfig);
    console.log('Loaded configuration: ' + JSON.stringify(deserialisedConfig));
    if (deserialisedConfig.version == CONFIG_VERSION) {
      return deserialisedConfig.stops;
    } else {
      console.log('Unknown configuration: ' + persistedConfig);
      return [];
    }
  } else {
    console.log('No persisted configuration');
    return [];
  }
}

function saveConfigToLocalStorage(newStops) {
  var configToPersist = {
    version: CONFIG_VERSION,
    stops: newStops,
  };
  localStorage.setItem('config', JSON.stringify(configToPersist));
}

// Array of stops, of the format [{code: 1234, description: '123 Foo St'}, ...]
var stops = loadConfigFromLocalStorage();
var currentIndex;

config.init(function() {
  return stops;
}, function(newConfig) {
  stops = newConfig;
  saveConfigToLocalStorage(stops);
  initStop(0);
});

function displayStop(stop, fresh, buses) {
  var window;
  if (fresh) {
    window = new UI.Window();
  } else {
    window = foregroundCard;
    window.each(function(el) {
      window.remove(el);
    });
  }
  window.add(new UI.Rect({
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    backgroundColor: 'white'
  }));
  window.add(new UI.Text({
    position: new Vector2(2, 0),
    size: new Vector2(110, 14),
    font: 'gothic-14-bold',
    text: stop.description,
    color: 'black',
    textAlign: 'left',
    textOverflow: 'ellipsis',
  }));
  window.add(new UI.Text({
    position: new Vector2(112, 0),
    size: new Vector2(30, 14),
    font: 'gothic-14-bold',
    text: stop.code,
    color: 'black',
    textAlign: 'right',
  }));
  var HEADER_HEIGHT = 14;
  var ROW_1_HEIGHT = 24;
  var ROW_2_HEIGHT = 18;
  var TOTAL_HEIGHT = ROW_1_HEIGHT + ROW_2_HEIGHT;
  buses.slice(0,3).forEach(function(bus, index) {
    var pos = HEADER_HEIGHT + TOTAL_HEIGHT * index;
    window.add(new UI.Text({
      position: new Vector2(1, pos),
      size: new Vector2(100, ROW_1_HEIGHT),
      font: 'gothic-24',
      text: bus.destination,
      color: 'black',
      textAlign: 'left',
      textOverflow: 'ellipsis',
    }));
    window.add(new UI.Text({
      position: new Vector2(103, pos),
      size: new Vector2(40, ROW_1_HEIGHT),
      font: 'gothic-24',
      text: bus.scheduled,
      color: 'black',
      textAlign: 'right',
      textOverflow: 'fill',
    }));
    window.add(new UI.Text({
      position: new Vector2(1, pos + ROW_1_HEIGHT),
      size: new Vector2(120, ROW_2_HEIGHT),
      font: 'gothic-18-bold',
      text: bus.route,
      color: 'black',
      textAlign: 'left',
      textOverflow: 'ellipsis',
    }));
    window.add(new UI.Text({
      position: new Vector2(122, pos + ROW_1_HEIGHT),
      size: new Vector2(20, ROW_2_HEIGHT),
      font: 'gothic-18-bold',
      text: bus.arrivalHint,
      color: 'black',
      textAlign: 'right',
      textOverflow: 'wrap',
    }));
  });
  if (fresh) {
    if (currentIndex > 0) {
      window.on('click', 'up', function() {
        initStop(currentIndex - 1);
      });
    }
    if (currentIndex < stops.length - 1) {
      window.on('click', 'down', function() {
        initStop(currentIndex + 1);
      });
    }
    window.on('longClick', 'select', function() {
      fetchStop(stop, true);
    });
    window.show();
    if (foregroundCard) {
      foregroundCard.hide();
    }
    foregroundCard = window;
  }
}

function fetchStop(stop, vibrateOnSuccess) {
  function finished(buses) {
    console.log('Buses: ' + JSON.stringify(buses));
    if (stop == stops[currentIndex]) {
      if (vibrateOnSuccess) {
        Vibe.vibrate('short');
      }
      displayStop(stop, false, buses);
    } else {
      console.log('Discarding late result for stop ' + stop.code + ', now on stop ' + stops[currentIndex].code);
    }
  }
  function error(errorString) {
    console.log('Error: ' + JSON.stringify(errorString));
    Vibe.vibrate('double');
  }
  api.fetchStop(stop.code, finished, error);
}

function initStop(stopIndex) {
  currentIndex = stopIndex;
  var stop = stops[stopIndex];
  if (stop) {
    displayStop(stop, true, []);// TODO restore the last-known bus timetable here
    fetchStop(stop, false);
  } else {
    displayStop({code: 0, description: 'Unconfigured'}, true, []);
  }
}

initStop(0);