// Store the configuration page javascript as a function
var CONFIG_PAGE_JS = function() {
  /* global document */
  var at_api_key = 'b04cda93-7d6e-44b0-a270-e5e1ab2c0d0f';
  var return_to_match = document.location.search.match(/[?&]return_to=([^&]*)/);
  var return_to = (return_to_match && decodeURIComponent(return_to_match[1])) || 'pebblejs://close#';
  // Strip off the trailing !!.html workaround for Pebble
  var config_json = document.location.hash.substring(1, document.location.hash.lastIndexOf('!!'));
  var config = JSON.parse(decodeURIComponent(config_json));
  
  function lookupStopDescription(code, callback, failureCallback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.at.govt.nz/v1/gtfs/stops/stopCode/' + code + '?api_key=' + at_api_key);
    xhr.addEventListener('loadend',function() {
      if (xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.status == 'OK') {
          if (response.response && response.response.length == 1 && response.response[0].stop_name) {
            callback(response.response[0].stop_name);
          } else {
            failureCallback('Error looking up stop ' + code + ', response was:\n' + JSON.stringify(response.response));
          }
        } else {
          failureCallback('Error looking up stop ' + code + ':\n' + ((response.error && response.error.message) || response.error || xhr.responseText));
        }
      } else {
        failureCallback('Error looking up stop ' + code + ': status ' + xhr.status + '\n' + xhr.responseText);
      }
    });
    xhr.send(null);
  }
  
  function returnConfig(newConfig) {
    document.location = return_to + encodeURIComponent(JSON.stringify(newConfig));
  }

  var statusDisplay = document.getElementById('status');
  var stopIds = document.getElementById('stopIds');
  stopIds.value = config.map(function(stop){return stop.code;}).join(',');
  stopIds.addEventListener('input', function() {
    statusDisplay.innerText = '';
  });
  var save = document.getElementById('save');
  save.addEventListener('click', function() {
    var newStopIds = stopIds.value.split(',').filter(function(id){return id.trim() !== '';}).map(Number);
    save.disabled = true;
    statusDisplay.innerText = 'Loading stop descriptions...';
    var failed = false;
    function failure(message) {
      // Only show one failure message per save request
      if (!failed) {
        failed = true;
        statusDisplay.innerText = message;
        save.disabled = false;
      }
    }
    if (newStopIds.some(isNaN)) {
      failure('Invalid stop numbers, they must be numeric');
    } else if (newStopIds.length === 0) {
      returnConfig([]);
    } else {
      var newConfig = Array(newStopIds.length);
      newStopIds.forEach(function(stopId, index) {
        lookupStopDescription(stopId, function(description) {
          newConfig[index] = { code: stopId, description: description };
          for (var i=0;i<newConfig.length;i++) {
            if (!newConfig[i]) {
              return;
            }
          }
          returnConfig(newConfig);
        }, failure);
      });
    }
  });
};

var CONFIG_PAGE = '<!DOCTYPE html><html><head>' +
    '<title>Auckland Bus Times Configuration</title>' +
    '</head><body>' +
    '<h1>Auckland Bus Times Configuration</h1>' +
    '<div><label for="stopIds">Stop Numbers</label> <input id="stopIds" /></div>' +
    '<div>Hint: Stop Numbers can be found on bus stops or on at.govt.nz. Multiple stop numbers can be specified, separated by commas.</div>' +
    '<div><button id="save">Save</button></div>' +
    '<div id="status"></div>' +
    '<script type="text/javascript">(' + CONFIG_PAGE_JS.toString() + ')()</script>' +
    '</body></html>';

function init(getConfig, setConfig) {
  Pebble.addEventListener('showConfiguration', function(e) {
    var configJSON = JSON.stringify(getConfig());
    console.log('Current configuration is ' + configJSON);
    var uri = 'data:text/html,' +
        encodeURIComponent(CONFIG_PAGE) +
        // Must add an HTML comment or any query string / hash parameters will be displayed in the page
        '<!--' +
        '#' + encodeURIComponent(configJSON) +
        // Pebble's Android app needs a trailing .html at the end of the URI for some reason.
        // Sadly it must be at the end of the hash, which will be parsed out in our JS
        '!!.html';
    console.log('Opening configuration page: ' + uri);
    Pebble.openURL(uri);
  });
  
  Pebble.addEventListener('webviewclosed',
    function(e) {
      if (e && e.response) {
        console.log('Configuration window returned ' + e.response);
        var newConfig;
        try {
          newConfig = JSON.parse(decodeURIComponent(e.response));
        } catch (jsonError) {
          console.log('Configuration window returned non-JSON response');
          return;
        }
        setConfig(newConfig);
      } else {
        console.log('Unexpected webviewclosed event: ' + JSON.stringify(e));
      }
    }
  );
}

this.exports.init = init;